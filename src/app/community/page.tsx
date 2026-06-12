"use client";

import { useState } from "react";

const MOCK_POSTS = [
  { id: 1, region: "완도읍", content: "앞바다 오늘 파고 낮아요 👍 출항 괜찮습니다", time: "3분 전", likes: 5 },
  { id: 2, region: "노화도", content: "수온 어제보다 1도 올랐어요. 급이량 조금 줄였습니다", time: "12분 전", likes: 3 },
  { id: 3, region: "청산도", content: "이번주 전복 시세 좀 올랐네요. 출하 타이밍 고민 중", time: "1시간 전", likes: 8 },
  { id: 4, region: "금일도", content: "어제 파고 높아서 못 나갔는데 오늘은 잔잔하네요", time: "2시간 전", likes: 2 },
  { id: 5, region: "약산도", content: "고수온 주의보 해제됐나요? 수과원 사이트가 안 열려요", time: "3시간 전", likes: 6 },
];

const REGIONS = ["전체", "완도읍", "노화도", "청산도", "금일도", "약산도", "보길도", "소안도"];

export default function CommunityPage() {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [inputText, setInputText] = useState("");

  const filtered = selectedRegion === "전체"
    ? MOCK_POSTS
    : MOCK_POSTS.filter((p) => p.region === selectedRegion);

  return (
    <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">

      {/* 한 줄 올리기 */}
      <section className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-3">✏️ 오늘 바다 어때요?</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="한 줄로 현재 바다 상황을 공유하세요"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E6E8C]"
          />
          <button
            className="bg-[#0E6E8C] text-white px-4 py-3 rounded-xl text-sm font-medium min-w-[60px]"
            onClick={() => setInputText("")}
          >
            올리기
          </button>
        </div>
      </section>

      {/* 지역 필터 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedRegion === region
                ? "bg-[#0A3D52] text-white"
                : "bg-white text-gray-500 border border-gray-200"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* 피드 */}
      <section className="space-y-3">
        {filtered.map(({ id, region, content, time, likes }) => (
          <div key={id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-xs font-medium bg-[#C8EBF3] text-[#0A3D52] px-2 py-1 rounded-full flex-shrink-0">
                  {region}
                </span>
                <p className="text-sm text-[#111827] leading-relaxed">{content}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-400">{time}</span>
              <button className="flex items-center gap-1 text-xs text-gray-400">
                <span>👍</span>
                <span>{likes}</span>
              </button>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
