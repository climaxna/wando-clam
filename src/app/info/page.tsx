const TEMP_GUIDE = [
  { range: "8°C 미만", status: "위험", color: "bg-red-50 border-red-200", badge: "bg-red-500 text-white", guide: "즉시 양식장을 확인하세요" },
  { range: "8~10°C", status: "주의", color: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-400 text-white", guide: "급이를 최소화하세요" },
  { range: "10~14°C", status: "주의", color: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-400 text-white", guide: "급이량을 줄이세요" },
  { range: "15~17°C", status: "최적", color: "bg-green-50 border-green-200", badge: "bg-green-500 text-white", guide: "평소대로 관리하세요" },
  { range: "18~22°C", status: "정상", color: "bg-green-50 border-green-200", badge: "bg-green-500 text-white", guide: "정상적으로 관리하세요" },
  { range: "23~24°C", status: "주의", color: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-400 text-white", guide: "급이량을 줄이세요" },
  { range: "25~26°C", status: "주의", color: "bg-orange-50 border-orange-200", badge: "bg-orange-500 text-white", guide: "급이를 50% 줄이세요" },
  { range: "27°C 이상", status: "위험", color: "bg-red-50 border-red-200", badge: "bg-red-500 text-white", guide: "급이를 즉시 중단하세요!" },
];

const SEASON_CALENDAR = [
  { month: "1~2월", point: "저수온기 — 급이 감소 권고, 성장 정지 구간", icon: "❄️", color: "bg-blue-50" },
  { month: "3~4월", point: "수온 급변 환절기 — 급변 감지 알람 주의", icon: "🌱", color: "bg-green-50" },
  { month: "5~6월", point: "성장 활발 — 평소대로 관리", icon: "☀️", color: "bg-yellow-50" },
  { month: "6~8월", point: "산란기 — 산란 후 면역 저하, 스트레스 최소화", icon: "🐚", color: "bg-teal-50" },
  { month: "7~9월", point: "고수온기 — 집단 폐사 위험, 수온 집중 모니터링", icon: "🔥", color: "bg-red-50" },
  { month: "9~10월", point: "수온 급변 환절기 — 급변 감지 알람 강화", icon: "🍂", color: "bg-orange-50" },
  { month: "11~2월", point: "저수온기 — 급이 감소 권고", icon: "🌨️", color: "bg-blue-50" },
];

export default function InfoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-4">

      {/* 적조·해파리 속보 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="bg-[#0A3D52] px-4 py-3 flex items-center gap-2">
          <span className="text-lg">🚨</span>
          <span className="text-white font-bold text-base">적조·해파리 속보</span>
          <span className="ml-auto text-xs text-white/60">국립수산과학원</span>
        </div>
        <div className="px-4 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">✅</span>
          </div>
          <div>
            <p className="font-bold text-[#0A3D52]">현재 완도 해역 특이사항 없음</p>
            <p className="text-xs text-gray-400 mt-0.5">API 연동 후 실시간 업데이트</p>
          </div>
        </div>
      </div>

      {/* 수온별 가이드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <p className="font-bold text-[#0A3D52] flex items-center gap-2">
            <span>🌡️</span> 수온별 전복 관리 가이드
          </p>
          <p className="text-xs text-gray-400 mt-0.5">국립수산과학원 기준</p>
        </div>
        <div className="divide-y divide-gray-50">
          {TEMP_GUIDE.map(({ range, status, color, badge, guide }) => (
            <div key={range} className={`flex items-center gap-3 px-4 py-3 ${color} border-l-0`}>
              <div className="w-[72px] flex-shrink-0">
                <span className="text-sm font-bold text-[#0A3D52]">{range}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${badge}`}>
                {status}
              </span>
              <p className="text-sm text-gray-700 flex-1">{guide}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 계절별 캘린더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <p className="font-bold text-[#0A3D52] flex items-center gap-2">
            <span>📅</span> 계절별 관리 캘린더
          </p>
        </div>
        <div className="p-4 space-y-2">
          {SEASON_CALENDAR.map(({ month, point, icon, color }) => (
            <div key={month} className={`flex items-start gap-3 ${color} rounded-xl px-3 py-3`}>
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-bold text-[#0A3D52]">{month}</p>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 전복 시세 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <p className="font-bold text-[#0A3D52] flex items-center gap-2">
            <span>💰</span> 전복 시세 정보
          </p>
        </div>
        <div className="px-4 py-6 flex flex-col items-center gap-2 text-center">
          <span className="text-4xl">📊</span>
          <p className="text-sm font-medium text-gray-500">한국농수산식품유통공사 API 연동 예정</p>
          <p className="text-xs text-gray-300">출시 후 실시간 시세 제공</p>
        </div>
      </div>

    </div>
  );
}
