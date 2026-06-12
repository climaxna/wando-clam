export default function InfoPage() {
  const SEASON_CALENDAR = [
    { month: "1~2월", point: "저수온기 — 급이 감소 권고, 성장 정지 구간", icon: "❄️" },
    { month: "3~4월", point: "수온 급변 환절기 — 급변 감지 알람 주의", icon: "🌱" },
    { month: "5~6월", point: "성장 활발 — 평소대로 관리", icon: "☀️" },
    { month: "6~8월", point: "산란기 — 산란 후 면역 저하, 스트레스 최소화", icon: "🐚" },
    { month: "7~9월", point: "고수온기 — 집단 폐사 위험, 수온 집중 모니터링", icon: "🔥" },
    { month: "9~10월", point: "수온 급변 환절기 — 급변 감지 알람 강화", icon: "🍂" },
    { month: "11~2월", point: "저수온기 — 급이 감소 권고", icon: "🌨️" },
  ];

  const TEMP_GUIDE = [
    { range: "8°C 미만", status: "🔴 위험", guide: "수온 위험 — 즉시 확인 필요" },
    { range: "8~10°C", status: "🟡 주의", guide: "저수온 — 급이 최소화하세요" },
    { range: "10~14°C", status: "🟡 주의", guide: "성장 둔화 — 급이 줄이세요" },
    { range: "15~17°C", status: "🟢 최적", guide: "최적 수온 — 평소대로 관리하세요" },
    { range: "18~22°C", status: "🟢 정상", guide: "수온 양호 — 정상 관리하세요" },
    { range: "23~24°C", status: "🟡 주의", guide: "수온 상승 — 급이량 줄이세요" },
    { range: "25~26°C", status: "🟡 주의", guide: "고수온 주의 — 급이 50% 줄이세요" },
    { range: "27°C 이상", status: "🔴 위험", guide: "폐사 위험 — 급이 즉시 중단!" },
  ];

  return (
    <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">

      {/* 적조·해파리 속보 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-3">🚨 적조·해파리 속보</h2>
        <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-400 text-sm">
          현재 완도 해역 특이사항 없음 ✅
          <p className="text-xs mt-1 text-gray-300">국립수산과학원 API 연동 예정</p>
        </div>
      </section>

      {/* 전복 수온별 관리 가이드 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-3">🌡️ 수온별 전복 관리 가이드</h2>
        <div className="space-y-2">
          {TEMP_GUIDE.map(({ range, status, guide }) => (
            <div key={range} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
              <div className="w-20 flex-shrink-0">
                <span className="text-xs font-medium text-[#0A3D52]">{range}</span>
              </div>
              <div className="flex-1">
                <span className="text-xs text-gray-500 block">{status}</span>
                <span className="text-sm text-[#111827]">{guide}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 계절별 관리 캘린더 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-3">📅 계절별 관리 캘린더</h2>
        <div className="space-y-3">
          {SEASON_CALENDAR.map(({ month, point, icon }) => (
            <div key={month} className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-bold text-[#0A3D52]">{month}</p>
                <p className="text-sm text-gray-600">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 전복 시세 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-400 mb-3">💰 전복 시세 정보</h2>
        <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-400 text-sm">
          한국농수산식품유통공사 API 연동 예정
        </div>
      </section>

    </div>
  );
}
