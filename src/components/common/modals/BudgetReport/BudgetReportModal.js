import React from "react";

export default function BudgetReportModal({ report, onClose }) {
    const approvalLine = [
        { id: 1, step: 1, position: "관리자", approver: "김철수", status: "승인" },
        { id: 2, step: 2, position: "회장", approver: "홍길동", status: "승인" },
    ];

    // 모달 바깥 클릭 시 닫기
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
            <div className="bg-white w-[600px] max-w-[90%] rounded-lg shadow-lg overflow-hidden relative">

                {/* 모달 헤더 */}
                <div className="bg-gradient-to-r from-[#4A96EC] to-[#237BE6] to-blue-600 text-white p-4 text-lg font-bold flex justify-between items-center">
                    <span>예산 보고서</span>
                    {/* X 버튼 */}
                    <button onClick={onClose} className="text-white text-2xl font-bold">
                        ✕
                    </button>
                </div>

                {/* 파일 업로드 영역 (보고서 파일 확인) */}
                <div className="p-6 flex flex-col items-center justify-center h-[400px] border-b border-gray-300">
                    <p className="text-gray-500">보고서 파일을 확인하세요</p>
                    <p className="text-gray-400 text-sm">(스크롤 가능 영역)</p>
                </div>

                {/* 결재 라인 */}
                <div className="p-4 bg-[#F7F7F7]">
                    <span className="text-gray-700 font-bold mb-2 block">결재 라인</span>
                    <div className="bg-white rounded-md shadow">
                        <table className="w-full border border-gray-300 rounded-md">
                            <thead className="bg-white-100">
                            <tr className="text-gray-700">
                                <th className="p-2 border">단계</th>
                                <th className="p-2 border">직위</th>
                                <th className="p-2 border">결재자</th>
                                <th className="p-2 border">상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            {approvalLine.map((item) => (
                                <tr key={item.id} className="text-center bg-white">
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