import { useState } from "react";

export default function PeopleManagement() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [clubSearch, setClubSearch] = useState("");
    const [statusSearch, setStatusSearch] = useState("");

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleClubSearch = (e) => {
        setClubSearch(e.target.value);
    };

    const handleStatusSearch = (e) => {
        setStatusSearch(e.target.value);
    };

    return (
        <div className="p-6">
            {/* 상단 필터 섹션 */}
            <div className="bg-gray-100 p-6 rounded-md mb-6">
                <h2 className="font-bold text-lg mb-4">인원 관리</h2>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label className="block font-medium text-sm mb-1">상태</label>
                        <div className="flex space-x-2">
                            <select
                                className="w-1/2 border border-gray-300 rounded p-2"
                                value={statusSearch}
                                onChange={handleStatusSearch}
                            >
                                <option value="">전체</option>
                                <option value="모집중">모집중</option>
                                <option value="마감">마감</option>
                            </select>
                            <input
                                type="text"
                                placeholder="상태 검색"
                                className="w-1/2 border border-gray-300 rounded p-2"
                                value={statusSearch}
                                onChange={handleStatusSearch}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block font-medium text-sm mb-1">동아리</label>
                        <div className="flex space-x-2">
                            <select
                                className="w-1/2 border border-gray-300 rounded p-2"
                                value={clubSearch}
                                onChange={handleClubSearch}
                            >
                                <option value="">전체</option>
                                <option value="DEVELOPER">DEVELOPER</option>
                                <option value="동아리1">동아리1</option>
                                <option value="동아리2">동아리2</option>
                            </select>
                            <input
                                type="text"
                                placeholder="동아리 검색"
                                className="w-1/2 border border-gray-300 rounded p-2"
                                value={clubSearch}
                                onChange={handleClubSearch}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block font-medium text-sm mb-1">활동 인원</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded p-2"
                                placeholder="최소"
                            />
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded p-2"
                                placeholder="최대"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block font-medium text-sm mb-1">누적 인원</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded p-2"
                                placeholder="최소"
                            />
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded p-2"
                                placeholder="최대"
                            />
                        </div>
                    </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    조회
                </button>
            </div>

            {/* 인원 조회 테이블 */}
            <div className="bg-white p-6 rounded-md">
                <h2 className="font-bold text-lg mb-4">인원 조회</h2>
                <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">No</th>
                        <th className="border border-gray-300 px-4 py-2">동아리</th>
                        <th className="border border-gray-300 px-4 py-2">활동 인원</th>
                        <th className="border border-gray-300 px-4 py-2">누적 인원</th>
                        <th className="border border-gray-300 px-4 py-2">상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* 여기에 데이터 맵핑 */}
                    <tr>
                        <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                        <td className="border border-gray-300 px-4 py-2">DEVELOPER</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">30</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">57</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">모집중</td>
                    </tr>
                    </tbody>
                </table>
                <button
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 float-right"
                    onClick={togglePopup}
                >
                    추가
                </button>
            </div>

            {/* 팝업 모달 */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-[400px]">
                        <h2 className="font-bold text-lg mb-4">인원 추가</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block font-medium text-sm mb-1">이름</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium text-sm mb-1">학과</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded p-2"
                                />
                            </div>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                추가
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 ml-2"
                                onClick={togglePopup}
                            >
                                취소
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
