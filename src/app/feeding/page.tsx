"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getZones,
  saveFeedingLog,
  getTodayFeedingByZone,
  getDailyAverage,
  Zone,
} from "@/lib/store";

const FEED_TYPES = ["미역", "다시마", "배합사료", "톳", "기타"];

type Step = 1 | 2 | 3;

interface SavedResult {
  amountKg: number;
  avg7day: number;
  feedType: string;
}

function getAnalysis(amount: number, avg: number) {
  if (avg === 0) return { label: "첫 기록", color: "text-[#1B8AB8]", icon: "📋" };
  const ratio = amount / avg;
  if (ratio > 1.2) return { label: "과급이 주의", color: "text-[#E85D4A]", icon: "⚠️" };
  if (ratio < 0.8) return { label: "급이 부족", color: "text-yellow-600", icon: "⚠️" };
  return { label: "적정 범위", color: "text-[#2E9E6B]", icon: "✅" };
}

export default function FeedingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [feedType, setFeedType] = useState(FEED_TYPES[0]);
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [result, setResult] = useState<SavedResult | null>(null);

  useEffect(() => {
    setZones(getZones());
  }, []);

  function handleSave() {
    if (!selectedZone || !amount) return;
    const kg = parseFloat(amount);
    saveFeedingLog({
      id: Date.now().toString(),
      zoneId: selectedZone.id,
      feedType,
      amountKg: kg,
      fedAt: new Date().toISOString(),
      memo: memo.trim() || undefined,
    });
    setResult({ amountKg: kg, avg7day: getDailyAverage(selectedZone.id, 7), feedType });
    setStep(3);
  }

  function resetForm() {
    setStep(1);
    setSelectedZone(null);
    setAmount("");
    setMemo("");
    setResult(null);
    setFeedType(FEED_TYPES[0]);
  }

  /* ── STEP 1: 구역 선택 ── */
  if (step === 1) {
    return (
      <div className="px-4 py-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => router.back()} className="text-gray-400 text-xl">←</button>
          <div>
            <p className="text-xs text-gray-400">STEP 1 / 2</p>
            <h1 className="text-xl font-bold text-[#0A4F6E]">구역 선택</h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {zones.map((zone) => {
            const todayLogs = getTodayFeedingByZone(zone.id);
            const isDone = todayLogs.length > 0;
            return (
              <button
                key={zone.id}
                onClick={() => { setSelectedZone(zone); setStep(2); }}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  isDone
                    ? "border-[#2E9E6B] bg-[#2E9E6B]/5"
                    : "border-gray-100 bg-white hover:border-[#1B8AB8]"
                }`}
              >
                <p className="text-2xl mb-2">{zone.type === "cage" ? "🌊" : "🏠"}</p>
                <p className="font-medium text-[#1A1A2E]">{zone.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {zone.abaloneCount.toLocaleString()}마리
                </p>
                {isDone && (
                  <p className="text-xs text-[#2E9E6B] mt-2">✅ 오늘 기록됨</p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── STEP 2: 사료 입력 ── */
  if (step === 2) {
    return (
      <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setStep(1)} className="text-gray-400 text-xl">←</button>
          <div>
            <p className="text-xs text-gray-400">STEP 2 / 2</p>
            <h1 className="text-xl font-bold text-[#0A4F6E]">{selectedZone?.name} 급이 입력</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-5">
          <div>
            <label className="text-sm text-gray-400 block mb-2">사료 종류</label>
            <div className="flex flex-wrap gap-2">
              {FEED_TYPES.map((f) => (
                <button
                  key={f}
                  onClick={() => setFeedType(f)}
                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                    feedType === f
                      ? "bg-[#0A4F6E] text-white border-[#0A4F6E]"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">투입량 (kg)</label>
            <input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full border border-gray-200 rounded-xl px-4 h-[56px] text-2xl font-bold text-center outline-none focus:border-[#1B8AB8]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">메모 (선택)</label>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="특이사항 입력..."
              className="w-full border border-gray-200 rounded-xl px-4 h-[52px] text-base outline-none focus:border-[#1B8AB8]"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full py-4 rounded-xl bg-[#0A4F6E] text-white font-medium text-lg disabled:opacity-40 hover:bg-[#1B8AB8] transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    );
  }

  /* ── STEP 3: 완료 ── */
  const analysis = result ? getAnalysis(result.amountKg, result.avg7day) : null;
  return (
    <div className="px-4 py-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-sm text-center space-y-5">
        <div className="text-6xl">✅</div>
        <h2 className="text-xl font-bold text-[#0A4F6E]">{selectedZone?.name} 기록 완료</h2>

        <div className="bg-[#E8F4F8] rounded-xl p-4 text-left space-y-3">
          <Row label="구역" value={selectedZone?.name ?? ""} />
          <Row label="사료 종류" value={result?.feedType ?? ""} />
          <Row label="투입량" value={`${result?.amountKg}kg`} bold />
          {result && result.avg7day > 0 && (
            <Row label="7일 평균" value={`${result.avg7day.toFixed(1)}kg`} />
          )}
          {analysis && (
            <div className="flex justify-between pt-2 border-t border-[#c5e0ec]">
              <span className="text-gray-500 text-sm">분석 결과</span>
              <span className={`font-medium text-sm ${analysis.color}`}>
                {analysis.icon} {analysis.label}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetForm}
            className="flex-1 py-4 rounded-xl bg-[#E8F4F8] text-[#0A4F6E] font-medium"
          >
            다음 구역 기록
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-4 rounded-xl bg-[#0A4F6E] text-white font-medium"
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className={`text-sm ${bold ? "font-bold text-[#0A4F6E]" : "font-medium text-[#1A1A2E]"}`}>
        {value}
      </span>
    </div>
  );
}
