"use client";

import { useState, useEffect } from "react";
import { getZones, getFeedingLogs, Zone, FeedingLog } from "@/lib/store";

type Period = 7 | 30;

function analyzeZone(zoneId: string, logs: FeedingLog[], period: Period) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - period);
  const periodLogs = logs.filter(
    (l) => l.zoneId === zoneId && new Date(l.fedAt) >= cutoff
  );
  if (periodLogs.length === 0) return null;

  const total = periodLogs.reduce((s, l) => s + l.amountKg, 0);
  const avg = total / period;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayTotal = periodLogs
    .filter((l) => new Date(l.fedAt) >= todayStart)
    .reduce((s, l) => s + l.amountKg, 0);

  let status: "over" | "under" | "ok" | "none" = "none";
  if (todayTotal > 0 && avg > 0) {
    const ratio = todayTotal / avg;
    if (ratio > 1.2) status = "over";
    else if (ratio < 0.8) status = "under";
    else status = "ok";
  }

  return {
    total: parseFloat(total.toFixed(1)),
    avg: parseFloat(avg.toFixed(1)),
    count: periodLogs.length,
    todayTotal: parseFloat(todayTotal.toFixed(1)),
    status,
  };
}

const STATUS_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  over: { label: "⚠️ 과급이", color: "text-[#E85D4A]", bg: "bg-[#E85D4A]/10" },
  under: { label: "⚠️ 부족", color: "text-yellow-600", bg: "bg-yellow-50" },
  ok: { label: "✅ 적정", color: "text-[#2E9E6B]", bg: "bg-[#2E9E6B]/10" },
  none: { label: "기록 없음", color: "text-gray-400", bg: "bg-gray-50" },
};

export default function AnalysisPage() {
  const [period, setPeriod] = useState<Period>(7);
  const [zones, setZones] = useState<Zone[]>([]);
  const [logs, setLogs] = useState<FeedingLog[]>([]);

  useEffect(() => {
    setZones(getZones());
    setLogs(getFeedingLogs());
  }, []);

  const hasLogs = logs.length > 0;

  return (
    <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-[#0A4F6E]">급이 분석</h1>

      <div className="flex gap-2">
        {([7, 30] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              period === p
                ? "bg-[#0A4F6E] text-white"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {p}일 분석
          </button>
        ))}
      </div>

      {!hasLogs ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-gray-500 font-medium">아직 급이 기록이 없어요</p>
          <p className="text-sm text-gray-400 mt-1">
            급이 기록을 추가하면 분석 결과가 표시됩니다
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {zones.map((zone) => {
            const analysis = analyzeZone(zone.id, logs, period);
            const badge = STATUS_BADGE[analysis?.status ?? "none"];
            return (
              <div key={zone.id} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-[#1A1A2E]">{zone.name}</p>
                    <p className="text-xs text-gray-400">
                      {analysis ? `${analysis.count}회 기록` : "기록 없음"}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${badge.color} ${badge.bg}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {analysis && (
                  <div className="grid grid-cols-3 gap-2">
                    <StatBox label={`${period}일 총량`} value={`${analysis.total}kg`} />
                    <StatBox label="일 평균" value={`${analysis.avg}kg`} highlight />
                    <StatBox label="오늘" value={analysis.todayTotal > 0 ? `${analysis.todayTotal}kg` : "-"} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-[#E8F4F8] rounded-xl p-3 text-center">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`text-base font-bold ${highlight ? "text-[#1B8AB8]" : "text-[#0A4F6E]"}`}>
        {value}
      </p>
    </div>
  );
}
