"use client";

import { useState, useEffect } from "react";
import { getZones, saveZone, deleteZone, Zone } from "@/lib/store";

export default function ZonesPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<"cage" | "tank">("cage");
  const [count, setCount] = useState("");

  useEffect(() => {
    setZones(getZones());
  }, []);

  function handleAdd() {
    if (!name.trim()) return;
    const zone: Zone = {
      id: Date.now().toString(),
      name: name.trim(),
      type,
      abaloneCount: parseInt(count) || 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    saveZone(zone);
    setZones(getZones());
    setName("");
    setCount("");
    setShowForm(false);
  }

  function handleDelete(id: string) {
    if (!confirm("구역을 삭제하시겠어요?")) return;
    deleteZone(id);
    setZones(getZones());
  }

  return (
    <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#0A4F6E]">구역 관리</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#1B8AB8] text-white px-4 py-2 rounded-xl text-sm font-medium"
        >
          + 구역 추가
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <h2 className="font-medium text-[#0A4F6E]">새 구역 등록</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="구역 이름 (예: 가두리 E)"
            className="w-full border border-gray-200 rounded-xl px-4 h-[52px] text-base outline-none focus:border-[#1B8AB8]"
          />
          <div className="flex gap-2">
            {(["cage", "tank"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-colors ${
                  type === t
                    ? "bg-[#0A4F6E] text-white border-[#0A4F6E]"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                {t === "cage" ? "🌊 가두리" : "🏠 수조"}
              </button>
            ))}
          </div>
          <input
            type="number"
            inputMode="numeric"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="전복 수량 (마리)"
            className="w-full border border-gray-200 rounded-xl px-4 h-[52px] text-base outline-none focus:border-[#1B8AB8]"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-4 rounded-xl border border-gray-200 text-gray-600 font-medium"
            >
              취소
            </button>
            <button
              onClick={handleAdd}
              className="flex-1 py-4 rounded-xl bg-[#0A4F6E] text-white font-medium"
            >
              저장
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {zones.map((zone) => (
          <div
            key={zone.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{zone.type === "cage" ? "🌊" : "🏠"}</span>
              <div>
                <p className="font-medium text-[#1A1A2E]">{zone.name}</p>
                <p className="text-sm text-gray-400">
                  {zone.type === "cage" ? "가두리" : "수조"} ·{" "}
                  {zone.abaloneCount.toLocaleString()}마리
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(zone.id)}
              className="text-gray-200 hover:text-[#E85D4A] transition-colors p-2 text-xl"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
