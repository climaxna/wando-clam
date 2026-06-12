"use client";

import { useMemo } from "react";
import Link from "next/link";

const SEA = {
  waterTemp: 18.4,
  waveHeight: 0.6,
  windSpeed: 3.2,
  weather: "맑음",
  weatherIcon: "☀️",
  region: "완도",
  updatedAt: "오전 6:00",
};

const TEMP_7DAY = [17.2, 17.8, 18.1, 18.4, 18.6, 18.3, 18.4];
const DAYS_LABEL = ["6일전", "5일전", "4일전", "3일전", "2일전", "어제", "오늘"];

const FORECAST = [
  { day: "오늘", icon: "☀️", temp: "19°", wave: "0.6m", safe: true },
  { day: "내일", icon: "🌤️", temp: "17°", wave: "0.8m", safe: true },
  { day: "목", icon: "☁️", temp: "16°", wave: "1.1m", safe: true },
  { day: "금", icon: "🌧️", temp: "14°", wave: "1.8m", safe: false },
  { day: "토", icon: "🌤️", temp: "18°", wave: "0.7m", safe: true },
];

const COMMUNITY_PREVIEW = [
  { region: "완도읍", content: "앞바다 오늘 파고 낮아요 👍 출항 괜찮습니다", time: "3분 전" },
  { region: "노화도", content: "수온 어제보다 1도 올랐어요. 급이량 줄였습니다", time: "12분 전" },
  { region: "청산도", content: "이번주 전복 시세 좀 올랐네요", time: "1시간 전" },
];

type WorkStatus = "safe" | "caution" | "danger";

function getWorkStatus(waterTemp: number, waveHeight: number, windSpeed: number): WorkStatus {
  if (waterTemp >= 27 || waterTemp <= 8 || waveHeight >= 2.5 || windSpeed >= 14) return "danger";
  if (waterTemp >= 25 || waterTemp <= 10 || waveHeight >= 1.5 || windSpeed >= 10) return "caution";
  return "safe";
}

function getManagementGuide(waterTemp: number): { title: string; detail: string } {
  if (waterTemp < 8) return { title: "수온 위험", detail: "즉시 양식장을 확인하세요" };
  if (waterTemp < 10) return { title: "저수온 주의", detail: "급이를 최소화하세요" };
  if (waterTemp < 15) return { title: "성장 둔화", detail: "급이량을 줄이세요" };
  if (waterTemp < 18) return { title: "최적 수온", detail: "평소대로 관리하세요" };
  if (waterTemp < 23) return { title: "수온 양호", detail: "정상적으로 관리하세요" };
  if (waterTemp < 25) return { title: "수온 상승", detail: "급이량을 줄이세요" };
  if (waterTemp < 27) return { title: "고수온 주의", detail: "급이를 50% 줄이세요" };
  return { title: "폐사 위험", detail: "급이를 즉시 중단하세요!" };
}

const STATUS_CONFIG = {
  safe: {
    label: "오늘 작업 가능",
    sub: "바다 환경이 좋습니다",
    gradient: "from-[#1E8C5E] to-[#16735A]",
    dot: "🟢",
    tag: "bg-green-100 text-green-700",
    tagText: "안전",
  },
  caution: {
    label: "주의 필요",
    sub: "출항 전 조건을 확인하세요",
    gradient: "from-[#E8921A] to-[#D4800F]",
    dot: "🟡",
    tag: "bg-yellow-100 text-yellow-700",
    tagText: "주의",
  },
  danger: {
    label: "작업 위험",
    sub: "오늘 출항을 삼가세요",
    gradient: "from-[#E05A3A] to-[#C94B2E]",
    dot: "🔴",
    tag: "bg-red-100 text-red-700",
    tagText: "위험",
  },
};

function TempSparkline({ temps }: { temps: number[] }) {
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = max - min || 1;
  const W = 300;
  const H = 64;
  const pad = 8;

  const points = temps.map((t, i) => ({
    x: (i / (temps.length - 1)) * (W - pad * 2) + pad,
    y: H - pad - ((t - min) / range) * (H - pad * 2),
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E6E8C" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0E6E8C" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#tempGrad)" />
      <path d={pathD} fill="none" stroke="#0E6E8C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 5 : 3.5} fill="#0E6E8C"
          stroke="white" strokeWidth={i === points.length - 1 ? 2 : 0} />
      ))}
    </svg>
  );
}

export default function Home() {
  const status = useMemo(() => getWorkStatus(SEA.waterTemp, SEA.waveHeight, SEA.windSpeed), []);
  const guide = useMemo(() => getManagementGuide(SEA.waterTemp), []);
  const cfg = STATUS_CONFIG[status];

  return (
    <div className="max-w-2xl mx-auto">

      {/* 신호등 히어로 */}
      <div className={`bg-gradient-to-br ${cfg.gradient} text-white px-5 pt-6 pb-8`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 mb-3`}>
              {cfg.dot} {cfg.tagText}
            </span>
            <h1 className="text-4xl font-bold tracking-tight leading-tight">{cfg.label}</h1>
            <p className="text-white/80 text-base mt-1">{cfg.sub}</p>
          </div>
          <div className="text-right text-xs text-white/60 mt-1">
            <p>완도</p>
            <p>{SEA.updatedAt} 기준</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[
            { label: "수온", value: `${SEA.waterTemp}°C`, icon: "🌡️" },
            { label: "파고", value: `${SEA.waveHeight}m`, icon: "🌊" },
            { label: "풍속", value: `${SEA.windSpeed}m/s`, icon: "💨" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white/15 rounded-2xl px-3 py-3 text-center">
              <div className="text-xl mb-1">{icon}</div>
              <div className="text-lg font-bold">{value}</div>
              <div className="text-xs text-white/70">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">

        {/* 오늘의 관리 포인트 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EFF6F9] flex items-center justify-center text-2xl flex-shrink-0">
            📋
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 font-medium mb-0.5">오늘의 전복 관리 포인트</p>
            <p className="text-base font-bold text-[#0A3D52]">{guide.title}</p>
            <p className="text-sm text-gray-500">{guide.detail}</p>
          </div>
        </div>

        {/* 날씨 & 파고 예보 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 mb-3">📅 5일 날씨·파고</p>
          <div className="flex gap-2">
            {FORECAST.map(({ day, icon, temp, wave, safe }) => (
              <div
                key={day}
                className={`flex-1 flex flex-col items-center gap-1 rounded-xl py-3 px-1 ${
                  day === "오늘" ? "bg-[#0A3D52] text-white" : "bg-[#EFF6F9]"
                }`}
              >
                <span className={`text-xs font-semibold ${day === "오늘" ? "text-white/80" : "text-gray-500"}`}>{day}</span>
                <span className="text-xl">{icon}</span>
                <span className={`text-sm font-bold ${day === "오늘" ? "text-white" : "text-[#0A3D52]"}`}>{temp}</span>
                <span className={`text-xs font-medium ${safe ? (day === "오늘" ? "text-blue-200" : "text-[#0E6E8C]") : "text-[#E05A3A]"}`}>
                  {wave}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 수온 추이 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-gray-500">📈 수온 7일 추이</p>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">현재</span>
              <span className="text-base font-bold text-[#0E6E8C]">{TEMP_7DAY[TEMP_7DAY.length - 1]}°C</span>
            </div>
          </div>
          <TempSparkline temps={TEMP_7DAY} />
          <div className="flex justify-between mt-1 px-1">
            {[0, 3, 6].map((i) => (
              <div key={i} className="text-center">
                <p className="text-xs text-gray-300">{DAYS_LABEL[i]}</p>
                <p className="text-xs font-medium text-gray-400">{TEMP_7DAY[i]}°</p>
              </div>
            ))}
          </div>
        </div>

        {/* 날씨 상세 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#EFF6F9] flex items-center justify-center text-2xl flex-shrink-0">
              {SEA.weatherIcon}
            </div>
            <div>
              <p className="text-xs text-gray-400">현재 날씨</p>
              <p className="text-xl font-bold text-[#0A3D52]">{SEA.weather}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-gray-400">가시거리</p>
              <p className="text-base font-bold text-[#0A3D52]">양호</p>
            </div>
          </div>
        </div>

        {/* 커뮤니티 미리보기 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-500">💬 오늘 어민 한마디</p>
            <Link href="/community" className="text-xs font-semibold text-[#0E6E8C] bg-[#EFF6F9] px-3 py-1 rounded-full">
              더보기
            </Link>
          </div>
          <div className="space-y-3">
            {COMMUNITY_PREVIEW.map(({ region, content, time }) => (
              <div key={time} className="flex items-start gap-3">
                <span className="mt-0.5 text-xs font-bold bg-[#0A3D52] text-white px-2 py-1 rounded-lg flex-shrink-0">
                  {region}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#111827] leading-relaxed">{content}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/community"
            className="mt-4 flex items-center justify-center w-full py-3 rounded-xl bg-[#EFF6F9] text-sm font-semibold text-[#0A3D52] active:bg-[#dceef5] transition-colors"
          >
            ✏️ 한 줄 올리기
          </Link>
        </div>

        <p className="text-xs text-center text-gray-300 pb-2">* 모의 데이터 · 공공 API 연동 예정</p>
      </div>
    </div>
  );
}
