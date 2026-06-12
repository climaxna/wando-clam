"use client";

import { useMemo } from "react";

const SEA = {
  waterTemp: 18.4,
  waveHeight: 0.6,
  windSpeed: 3.2,
  weather: "맑음",
  weatherIcon: "☀️",
  region: "완도",
};

const TEMP_7DAY = [17.2, 17.8, 18.1, 18.4, 18.6, 18.3, 18.4];

const FORECAST = [
  { day: "오늘", icon: "☀️", temp: "19°", wave: "0.6m" },
  { day: "내일", icon: "🌤️", temp: "17°", wave: "0.8m" },
  { day: "목", icon: "☁️", temp: "16°", wave: "1.1m" },
  { day: "금", icon: "🌧️", temp: "14°", wave: "1.8m" },
  { day: "토", icon: "🌤️", temp: "18°", wave: "0.7m" },
];

const COMMUNITY_PREVIEW = [
  { region: "완도읍", content: "앞바다 오늘 파고 낮아요 👍", time: "3분 전" },
  { region: "노화도", content: "수온 어제보다 1도 올랐어요", time: "12분 전" },
  { region: "청산도", content: "이번주 전복 시세 좀 올랐네요", time: "1시간 전" },
];

type WorkStatus = "safe" | "caution" | "danger";

function getWorkStatus(waterTemp: number, waveHeight: number, windSpeed: number): WorkStatus {
  if (waterTemp >= 27 || waterTemp <= 8 || waveHeight >= 2.5 || windSpeed >= 14) return "danger";
  if (waterTemp >= 25 || waterTemp <= 10 || waveHeight >= 1.5 || windSpeed >= 10) return "caution";
  return "safe";
}

function getManagementGuide(waterTemp: number): string {
  if (waterTemp < 8) return "수온 위험 — 즉시 확인 필요";
  if (waterTemp < 10) return "저수온 — 급이 최소화하세요";
  if (waterTemp < 15) return "성장 둔화 구간 — 급이 줄이세요";
  if (waterTemp < 18) return "최적 수온 — 평소대로 관리하세요";
  if (waterTemp < 23) return "수온 양호 — 정상 관리하세요";
  if (waterTemp < 25) return "수온 상승 — 급이량 줄이세요";
  if (waterTemp < 27) return "고수온 주의 — 급이 50% 줄이세요";
  return "폐사 위험 — 급이 즉시 중단!";
}

const STATUS_CONFIG = {
  safe: {
    emoji: "🟢",
    label: "오늘 작업 가능",
    sub: "해양 환경 양호",
    bg: "bg-[#1E8C5E]",
    badge: "bg-[#1E8C5E]",
  },
  caution: {
    emoji: "🟡",
    label: "주의 필요",
    sub: "조건 확인 후 출항하세요",
    bg: "bg-[#F5A623]",
    badge: "bg-[#F5A623]",
  },
  danger: {
    emoji: "🔴",
    label: "작업 위험",
    sub: "오늘 출항을 삼가세요",
    bg: "bg-[#E05A3A]",
    badge: "bg-[#E05A3A]",
  },
};

function TempSparkline({ temps }: { temps: number[] }) {
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = max - min || 1;
  const W = 300;
  const H = 56;
  const pts = temps
    .map((t, i) => {
      const x = (i / (temps.length - 1)) * W;
      const y = H - ((t - min) / range) * H * 0.8 - H * 0.1;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-14" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="#0E6E8C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {temps.map((t, i) => {
        const x = (i / (temps.length - 1)) * W;
        const y = H - ((t - min) / range) * H * 0.8 - H * 0.1;
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#0E6E8C" />;
      })}
    </svg>
  );
}

export default function Home() {
  const status = useMemo(() => getWorkStatus(SEA.waterTemp, SEA.waveHeight, SEA.windSpeed), []);
  const guide = useMemo(() => getManagementGuide(SEA.waterTemp), []);
  const cfg = STATUS_CONFIG[status];

  return (
    <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">

      {/* 작업 신호등 */}
      <section className={`${cfg.bg} text-white rounded-2xl p-6 flex flex-col items-center gap-2 shadow-md`}>
        <span className="text-5xl">{cfg.emoji}</span>
        <p className="text-3xl font-bold tracking-tight mt-1">{cfg.label}</p>
        <p className="text-base opacity-90">{cfg.sub}</p>
        <div className="mt-2 text-sm opacity-75">
          수온 {SEA.waterTemp}°C · 파고 {SEA.waveHeight}m · 풍속 {SEA.windSpeed}m/s
        </div>
      </section>

      {/* 실시간 해양 환경 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-4">🌊 실시간 해양 환경 — {SEA.region}</h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "수온", value: `${SEA.waterTemp}°C`, icon: "🌡️" },
            { label: "파고", value: `${SEA.waveHeight}m`, icon: "🌊" },
            { label: "풍속", value: `${SEA.windSpeed}m/s`, icon: "💨" },
            { label: "날씨", value: SEA.weather, icon: SEA.weatherIcon },
          ].map(({ label, value, icon }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1">
              <span className="text-2xl">{icon}</span>
              <span className="text-base font-bold text-[#0A3D52]">{value}</span>
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-300 mt-3 text-right">* 모의 데이터 (API 연동 예정)</p>
      </section>

      {/* 오늘의 관리 가이드 */}
      <section className="bg-[#C8EBF3] rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-[#0A3D52] mb-2">📋 오늘의 전복 관리 포인트</h2>
        <p className="text-lg font-bold text-[#0A3D52]">{guide}</p>
        <p className="text-xs text-[#0E6E8C] mt-1">현재 수온 {SEA.waterTemp}°C 기준 자동 생성</p>
      </section>

      {/* 수온 7일 추이 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-400">📈 수온 7일 추이</h2>
          <span className="text-base font-bold text-[#0E6E8C]">
            {TEMP_7DAY[TEMP_7DAY.length - 1]}°C
          </span>
        </div>
        <TempSparkline temps={TEMP_7DAY} />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-300">7일 전</span>
          <span className="text-xs text-gray-300">오늘</span>
        </div>
      </section>

      {/* 5일 예보 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-3">📅 5일 날씨·파고 예보</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FORECAST.map(({ day, icon, temp, wave }) => (
            <div
              key={day}
              className="flex-shrink-0 flex flex-col items-center gap-1 bg-[#C8EBF3] rounded-xl px-4 py-3 min-w-[68px]"
            >
              <span className="text-xs text-gray-500">{day}</span>
              <span className="text-2xl">{icon}</span>
              <span className="text-sm font-bold text-[#0A3D52]">{temp}</span>
              <span className="text-xs text-[#0E6E8C]">{wave}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 커뮤니티 미리보기 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-400">💬 오늘 어민 한마디</h2>
          <a href="/community" className="text-xs text-[#0E6E8C]">더보기 →</a>
        </div>
        <div className="space-y-3">
          {COMMUNITY_PREVIEW.map(({ region, content, time }) => (
            <div key={time} className="flex items-start gap-3">
              <span className="text-xs font-medium bg-[#C8EBF3] text-[#0A3D52] px-2 py-1 rounded-full flex-shrink-0">
                {region}
              </span>
              <div className="flex-1">
                <p className="text-sm text-[#111827]">{content}</p>
                <p className="text-xs text-gray-400 mt-0.5">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
