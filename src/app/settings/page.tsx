"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [alarmSettings, setAlarmSettings] = useState({
    tempCaution: 25.0,
    tempCritical: 27.0,
    tempLow: 10.0,
    waveCaution: 1.5,
    redtide: true,
    jellyfish: true,
    community: false,
  });

  const [region, setRegion] = useState("완도읍");
  const REGIONS = ["완도읍", "노화도", "청산도", "금일도", "약산도", "보길도", "소안도"];

  return (
    <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">

      {/* 내 지역 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-3">📍 내 어장 지역</h2>
        <div className="flex gap-2 flex-wrap">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                region === r ? "bg-[#0A3D52] text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      {/* 수온 알람 설정 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-4">🌡️ 수온 알람 임계값</h2>
        <div className="space-y-4">
          {[
            { label: "수온 주의 (기본 25°C)", key: "tempCaution", unit: "°C" },
            { label: "수온 긴급 (기본 27°C)", key: "tempCritical", unit: "°C" },
            { label: "저수온 (기본 10°C)", key: "tempLow", unit: "°C" },
            { label: "파고 경고 (기본 1.5m)", key: "waveCaution", unit: "m" },
          ].map(({ label, key, unit }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-[#111827]">{label}</span>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#0E6E8C]">
                  {alarmSettings[key as keyof typeof alarmSettings]}{unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 알람 수신 설정 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-4">🔔 알람 수신 설정</h2>
        <div className="space-y-4">
          {[
            { label: "수온 위험 알람", key: "redtide", desc: "수온 임계값 초과 시 즉시 알림" },
            { label: "적조·해파리 속보", key: "jellyfish", desc: "국립수산과학원 속보 수신" },
            { label: "커뮤니티 새 글", key: "community", desc: "내 지역 새 글 알림" },
          ].map(({ label, key, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#111827]">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() =>
                  setAlarmSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
                }
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  alarmSettings[key as keyof typeof alarmSettings] ? "bg-[#0E6E8C]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    alarmSettings[key as keyof typeof alarmSettings] ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-center text-gray-300 mt-2">완도바다 v0.1 — Supabase 연동 예정</p>
    </div>
  );
}
