"use client";

import { useState } from "react";

const REGIONS = ["완도읍", "노화도", "청산도", "금일도", "약산도", "보길도", "소안도"];

const ALARM_ITEMS = [
  { key: "tempWarn", label: "수온 위험 알람", desc: "임계값 초과 시 즉시 알림", icon: "🌡️" },
  { key: "redtide", label: "적조·해파리 속보", desc: "국립수산과학원 속보 수신", icon: "🚨" },
  { key: "community", label: "커뮤니티 새 글", desc: "내 지역 새 글 알림", icon: "💬" },
];

const THRESHOLDS = [
  { label: "수온 주의", key: "tempCaution", value: 25.0, unit: "°C", color: "text-yellow-500" },
  { label: "수온 긴급", key: "tempCritical", value: 27.0, unit: "°C", color: "text-red-500" },
  { label: "저수온", key: "tempLow", value: 10.0, unit: "°C", color: "text-blue-500" },
  { label: "파고 경고", key: "waveCaution", value: 1.5, unit: "m", color: "text-orange-500" },
];

export default function SettingsPage() {
  const [alarms, setAlarms] = useState({ tempWarn: true, redtide: true, community: false });
  const [region, setRegion] = useState("완도읍");

  const toggleAlarm = (key: string) => {
    setAlarms((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-4">

      {/* 내 지역 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <p className="font-bold text-[#0A3D52] flex items-center gap-2">
            <span>📍</span> 내 어장 지역
          </p>
          <p className="text-xs text-gray-400 mt-0.5">선택한 지역 기준으로 정보를 제공합니다</p>
        </div>
        <div className="p-4 flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                region === r
                  ? "bg-[#0A3D52] text-white shadow-sm"
                  : "bg-[#EFF6F9] text-gray-600"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 알람 임계값 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <p className="font-bold text-[#0A3D52] flex items-center gap-2">
            <span>⚠️</span> 알람 임계값
          </p>
          <p className="text-xs text-gray-400 mt-0.5">기본값은 국립수산과학원 권고 기준입니다</p>
        </div>
        <div className="divide-y divide-gray-50">
          {THRESHOLDS.map(({ label, key, value, unit, color }) => (
            <div key={key} className="flex items-center px-4 py-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#111827]">{label}</p>
              </div>
              <div className={`text-xl font-bold ${color}`}>
                {value}{unit}
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2">
            💡 임계값 변경 기능은 Supabase 연동 후 제공됩니다
          </p>
        </div>
      </div>

      {/* 알람 수신 설정 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <p className="font-bold text-[#0A3D52] flex items-center gap-2">
            <span>🔔</span> 알람 수신
          </p>
        </div>
        <div className="divide-y divide-gray-50">
          {ALARM_ITEMS.map(({ key, label, desc, icon }) => (
            <div key={key} className="flex items-center px-4 py-4 gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6F9] flex items-center justify-center text-xl flex-shrink-0">
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#111827]">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() => toggleAlarm(key)}
                className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                  alarms[key as keyof typeof alarms] ? "bg-[#0E6E8C]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    alarms[key as keyof typeof alarms] ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-300">완도바다 v0.1</p>
        <p className="text-xs text-gray-300 mt-0.5">전복 양식 어민을 위한 스마트 정보 허브</p>
      </div>

    </div>
  );
}
