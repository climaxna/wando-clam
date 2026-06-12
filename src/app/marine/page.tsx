export default function MarinePage() {
  return (
    <div className="px-4 py-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-[#0A4F6E] mb-4">해양 상세 정보</h1>
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
        <p className="text-4xl mb-3">🌊</p>
        <p className="text-gray-500 font-medium">공공 API 연동 예정</p>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          국립수산과학원 실시간수온정보 API와<br />
          기상청 단기예보 API 연동 후 제공됩니다.
        </p>
        <div className="mt-4 text-xs text-gray-300 space-y-1">
          <p>• 국립수산과학원 실시간수온정보</p>
          <p>• 국립해양측위정보원 해양기상 정보</p>
          <p>• 기상청 단기예보 조회</p>
        </div>
      </div>
    </div>
  );
}
