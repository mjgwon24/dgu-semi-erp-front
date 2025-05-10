import React from "react";

export default function BudgetReportModal({ report, onClose }) {
    const approvalLine = [
        { id: 1, role: "검토자", step: 1, position: "회장", approver: "홍길동", status: "승인" },
        { id: 2, role: "승인자", step: 2, position: "부회장", approver: "홍길동", status: "승인" },
    ];

    const handleOverlayClick = (e) => {
        if (e.target.id === "modal-overlay") {
            onClose();
        }
    };

    return (
        <div
            id="modal-overlay"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleOverlayClick}
        >
            <div
                className="bg-white w-[800px] max-w-[95%] rounded-lg shadow-lg overflow-hidden relative"
                style={{fontFamily: 'Pretendard'}}
            >
                {/* 헤더 */}
                <div className="bg-[#4A96EC] text-white p-4 text-lg font-bold flex justify-between items-center">
                    <span>예산 보고서</span>
                    <button onClick={onClose} className="text-white text-2xl font-bold">✕</button>
                </div>

                {/* 본문 */}
                <div className="p-6 flex gap-6 border-b border-gray-300 items-stretch">
                    {/* 이미지 영역 */}
                    <div className="w-1/4 min-h-[260px]">
                        <img
                            src="https://m.apjrental.com/web/product/big/201908/8f5429cb03319c740527d84edb88effd.png"
                            alt="품목 이미지"
                            className="w-full h-full object-contain border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* 항목 정보 */}
                    <div className="w-3/4 min-h-[260px]">
                        <div className="border border-gray-300 rounded-md overflow-hidden h-full">
                            <table className="w-full text-sm h-full">
                                <tbody>
                                {[
                                    {label: "품목 형태", value: "물품"},
                                    {label: "품목 정보", value: "의자"},
                                    {label: "품목 개수", value: "20 EA"},
                                    {label: "금액", value: "200,000원"},
                                    {label: "기안자", value: "x석x"},
                                    {label: "구매 예정일", value: "2025.03.19"},
                                ].map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`border-t border-gray-300 ${idx === 0 ? 'border-t-0' : ''}`}
                                    >
                                        <td className="p-2 w-[35%] text-gray-600 font-medium border-r border-gray-300">
                                            {row.label}
                                        </td>
                                        <td className="p-2 text-gray-800">{row.value}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 구매 사유 */}
                <div className="px-6 pt-4 pb-2">
                    <div className="font-semibold text-gray-700 mb-2">구매 사유</div>
                    <div className="text-gray-600 text-sm border p-3 rounded-md bg-gray-50">
                        해커톤 행사 진행간 참여 인원 편의 제공
                    </div>
                </div>

                {/* 예산 그래프 */}
                <div className="px-6 py-4">
                    <div className="bg-[#F7F7F7] border border-gray-300 rounded-md p-4 space-y-2 text-sm">
                        {[
                            {label: "총 예산", amount: 800000},
                            {label: "사용 전 예산", amount: 500000},
                            {label: "사용 할 예산", amount: 200000},
                            {label: "사용 후 예산", amount: 300000},
                        ].map(({label, amount}, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-32 text-black font-medium text-[14px] leading-normal"
                                     style={{fontFamily: 'Pretendard'}}>
                                    {label}
                                </div>
                                <div className="flex-1 bg-gray-200 h-6 overflow-hidden">
                                    <div
                                        className="h-full bg-[#4A96EC]"
                                        style={{width: `${(amount / 800000) * 100}%`}}
                                    ></div>
                                </div>
                                <div className="w-24 text-right text-gray-700 font-medium">
                                    {amount.toLocaleString()}원
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 결재 라인 */}
                <div className="p-6 bg-[#F7F7F7]">
                    <span className="text-gray-700 font-bold mb-2 block">결재 라인</span>
                    <div className="bg-white rounded-md shadow">
                        <table className="w-full border border-gray-300 rounded-md text-sm">
                            <thead className="bg-gray-100">
                            <tr className="text-gray-700">
                                <th className="p-2 border">결재 역할</th>
                                <th className="p-2 border">단계</th>
                                <th className="p-2 border">직위</th>
                                <th className="p-2 border">결재자</th>
                                <th className="p-2 border">상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            {approvalLine.map((item) => (
                                <tr key={item.id} className="text-center bg-white">
                                    <td className="p-2 border">{item.role}</td>
                                    <td className="p-2 border">{item.step}</td>
                                    <td className="p-2 border">{item.position}</td>
                                    <td className="p-2 border">{item.approver}</td>
                                    <td className={`p-2 border ${item.status === "승인" ? "text-green-600" : "text-yellow-600"}`}>
                                        {item.status}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}