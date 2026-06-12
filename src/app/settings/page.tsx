export default function SettingsPage() {
  return (
    <div className="px-4 py-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-[#0A4F6E] mb-4">설정</h1>
      <div className="space-y-2">
        {[
          { icon: "👤", label: "프로필 설정", desc: "양식장 정보 관리" },
          { icon: "🔔", label: "알림 설정", desc: "급이 미기록 알림" },
          { icon: "🔑", label: "API 키 관리", desc: "공공 API 키 입력" },
          { icon: "💾", label: "데이터 백업", desc: "기록 내보내기" },
        ].map(({ icon, label, desc }) => (
          <div
            key={label}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm flex items-center gap-4"
          >
            <span className="text-2xl">{icon}</span>
            <div>
              <p className="font-medium text-[#1A1A2E]">{label}</p>
              <p className="text-sm text-gray-400">{desc}</p>
            </div>
            <span className="ml-auto text-gray-300 text-lg">›</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-center text-gray-300 mt-6">완도 전복 다이어리 v0.1</p>
    </div>
  );
}
