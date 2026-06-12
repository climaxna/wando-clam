"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getZones, getTodayFeedingByZone, Zone } from "@/lib/store";

const MARINE = {
  waterTemp: 18.4,
  waveHeight: 0.6,
  windSpeed: 3.2,
  weather: "맑음",
  weatherIcon: "☀️",
};

const TEMP_7DAY = [17.2, 17.8, 18.1, 18.4, 18.6, 18.3, 18.4];

const FORECAST = [
  { day: "오늘", icon: "☀️", temp: "19°", wave: "0.6m" },
  { day: "내일", icon: "🌤️", temp: "17°", wave: "0.8m" },
  { day: "목", icon: "☁️", temp: "16°", wave: "1.1m" },
  { day: "금", icon: "🌧️", temp: "14°", wave: "1.8m" },
  { day: "토", icon: "🌤️", temp: "18°", wave: "0.7m" },
];

function TempSparkline({ temps }: { temps: number[] }) {
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = max - min || 1;
  const W = 300;
  const H = 56;
  const pts = temps
    .map((t, i) => {
      const x = (i / (temps.length - 1)) * W;
      const y = H - ((t - min) / range) * H * 0.85 - H * 0.075;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-14" preserveAspectRatio="none">
      <polyline
        points={pts}
        fill="none"
        stroke="#1B8AB8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {temps.map((t, i) => {
        const x = (i / (temps.length - 1)) * W;
        const y = H - ((t - min) / range) * H * 0.85 - H * 0.075;
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#1B8AB8" />;
      })}
    </svg>
  );
}

type ZoneStatus = "done" | "partial" | "none";

const STATUS_STYLE: Record<ZoneStatus, { icon: string; border: string; bg: string; text: string }> = {
  done: { icon: "✅", border: "border-[#2E9E6B]", bg: "bg-[#2E9E6B]/10", text: "text-[#2E9E6B]" },
  partial: { icon: "⚠️", border: "border-yellow-400", bg: "bg-yellow-50", text: "text-yellow-600" },
  none: { icon: "❌", border: "border-[#E85D4A]", bg: "bg-[#E85D4A]/10", text: "text-[#E85D4A]" },
};

export default function Dashboard() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, ZoneStatus>>({});

  useEffect(() => {
    const z = getZones();
    setZones(z);
    const m: Record<string, ZoneStatus> = {};
    z.forEach((zone) => {
      const logs = getTodayFeedingByZone(zone.id);
      m[zone.id] = logs.length >= 2 ? "done" : logs.length === 1 ? "partial" : "none";
    });
    setStatusMap(m);
  }, []);

  const isWarning = MARINE.waveHeight >= 1.5 || MARINE.windSpeed >= 10;
  const doneCount = Object.values(statusMap).filter((s) => s === "done").length;

  return (
    <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">
      {isWarning && (
        <div className="bg-[#E85D4A] text-white rounded-2xl p-4 flex items-center gap-3">
          <span className="text-3xl">⚠️</span>
          <div>
            <p className="font-bold text-base">기상 주의</p>
            <p className="text-sm opacity-90">
              파고 {MARINE.waveHeight}m · 풍속 {MARINE.windSpeed}m/s
            </p>
          </div>
        </div>
      )}

      {/* Marine environment */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-4">🌊 해양 환경</h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "수온", value: `${MARINE.waterTemp}°C`, icon: "🌡️" },
            { label: "파고", value: `${MARINE.waveHeight}m`, icon: "🌊" },
            { label: "풍속", value: `${MARINE.windSpeed}m/s`, icon: "💨" },
            { label: "날씨", value: MARINE.weather, icon: MARINE.weatherIcon },
          ].map(({ label, value, icon }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1">
              <span className="text-2xl">{icon}</span>
              <span className="text-sm font-bold text-[#0A4F6E]">{value}</span>
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-300 mt-3 text-right">* 모의 데이터 (API 연동 예정)</p>
      </section>

      {/* Temperature trend */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-400">📈 수온 7일 추이</h2>
          <span className="text-base font-bold text-[#1B8AB8]">
            {TEMP_7DAY[TEMP_7DAY.length - 1]}°C
          </span>
        </div>
        <TempSparkline temps={TEMP_7DAY} />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-300">7일 전</span>
          <span className="text-xs text-gray-300">오늘</span>
        </div>
      </section>

      {/* 5-day forecast */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-3">📅 5일 예보</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FORECAST.map(({ day, icon, temp, wave }) => (
            <div
              key={day}
              className="flex-shrink-0 flex flex-col items-center gap-1 bg-[#E8F4F8] rounded-xl px-4 py-3 min-w-[68px]"
            >
              <span className="text-xs text-gray-500">{day}</span>
              <span className="text-2xl">{icon}</span>
              <span className="text-sm font-bold text-[#1A1A2E]">{temp}</span>
              <span className="text-xs text-[#1B8AB8]">{wave}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-3">⚡ 빠른 작업</h2>
        <Link
          href="/feeding"
          className="block w-full bg-[#0A4F6E] text-white text-center py-4 rounded-xl font-medium text-lg mb-3 hover:bg-[#1B8AB8] transition-colors"
        >
          + 급이 기록하기
        </Link>
        <div className="grid grid-cols-3 gap-2">
          {[
            { href: "/analysis", icon: "📊", label: "급이 분석" },
            { href: "/zones", icon: "🦪", label: "구역 관리" },
            { href: "/marine", icon: "🌊", label: "해양 상세" },
          ].map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 bg-[#E8F4F8] rounded-xl py-3 hover:bg-[#d4eaf5] transition-colors"
            >
              <span className="text-xl">{icon}</span>
              <span className="text-xs text-gray-600">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Zone status */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-400">🗂️ 오늘 구역별 현황</h2>
          <span className="text-xs text-gray-400">
            {doneCount} / {zones.length} 완료
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {zones.map((zone) => {
            const s = statusMap[zone.id] ?? "none";
            const style = STATUS_STYLE[s];
            return (
              <div
                key={zone.id}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border ${style.border} ${style.bg}`}
              >
                <span className="text-lg">{style.icon}</span>
                <span className={`text-xs font-medium ${style.text} text-center leading-tight`}>
                  {zone.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
