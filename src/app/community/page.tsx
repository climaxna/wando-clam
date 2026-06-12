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
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const filtered = selectedRegion === "전체"
    ? MOCK_POSTS
    : MOCK_POSTS.filter((p) => p.region === selectedRegion);

  const toggleLike = (id: number) => {
    setLikedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="max-w-2xl mx-auto">

      {/* 글 작성 */}
      <div className="bg-[#0A3D52] px-4 pt-4 pb-6">
        <p className="text-white font-bold text-base mb-3">✏️ 오늘 바다 어때요?</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="한 줄로 현재 바다 상황을 공유하세요"
            className="flex-1 bg-white/15 text-white placeholder-white/50 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/50"
          />
          <button
            className="bg-white text-[#0A3D52] px-4 py-3 rounded-xl text-sm font-bold flex-shrink-0 active:bg-gray-100 transition-colors"
            onClick={() => setInputText("")}
          >
            올리기
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">

        {/* 지역 필터 */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors active:scale-95 ${
                selectedRegion === region
                  ? "bg-[#0A3D52] text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* 피드 */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
              <p className="text-3xl mb-2">🌊</p>
              <p className="text-gray-400 text-sm">이 지역 게시글이 없습니다</p>
            </div>
          ) : (
            filtered.map(({ id, region, content, time, likes }) => (
              <div key={id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold bg-[#0A3D52] text-white px-2.5 py-1 rounded-lg flex-shrink-0 mt-0.5">
                    {region}
                  </span>
                  <p className="text-base text-[#111827] leading-relaxed flex-1">{content}</p>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <span className="text-xs text-gray-400">{time}</span>
                  <button
                    onClick={() => toggleLike(id)}
                    className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors ${
                      likedIds.includes(id)
                        ? "bg-blue-50 text-[#0E6E8C]"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    <span>{likedIds.includes(id) ? "👍" : "👍"}</span>
                    <span>{likes + (likedIds.includes(id) ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
