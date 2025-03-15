import React, { useState } from 'react';
import { renderPagination } from "@/src/components/common/layout/table/pagination";

export default function NotifyUI() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 8; // Example total pages, replace with actual logic

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col gap-7 p-5 h-full">
            <div className="flex flex-col gap-2">
                <div>
                    <h3 className="text-xl weight-700">알림</h3>
                </div>
            </div>

            <div className="flex flex-row gap-3 w-full h-full">
                <div className="flex flex-col gap-2 w-[210px] min-w-[140px] text-[15px]">
                    <div
                        className="flex flex-row justify-between cursor-pointer border border-solid border-[#1E7EE4] rounded-lg px-5 py-3 bg-[#F0F7FF]">
                        <p className="weight-700 text-[#1E7EE4]">동아리</p>
                        <p className="text-[#808080] weight-500">3</p>
                    </div>
                    <div
                        className="flex flex-row justify-between cursor-pointer border border-solid border-[#DBDBDB] rounded-lg px-5 py-3 bg-white">
                        <p className="weight-600">예산</p>
                        <p className="text-[#808080] weight-500">3</p>
                    </div>
                    <div
                        className="flex flex-row justify-between cursor-pointer border border-solid border-[#DBDBDB] rounded-lg px-5 py-3 bg-white">
                        <p className="weight-600">통장 관리</p>
                        <p className="text-[#808080] weight-500">3</p>
                    </div>
                </div>

                <div className="flex flex-col w-full h-full">
                    <div
                        className="w-full h-[90%] border border-solid border-[#DBDBDB] rounded-lg px-8 py-6 bg-white">
                        <div className="flex flex-row justify-between p-1">
                            <div className="flex flex-col justify-between pr-4">
                                <div className="flex flex-row items-center gap-2 pb-1.5">
                                    <p className="weight-700">결제 승인 요청</p>
                                    <p className="text-[#1E7EE4] text-[14px] weight-500">New</p>
                                </div>

                                <p className="text-[14px] text-[#4C545B] weight-500">[DEVELOPER] 2025.03.10 카누 외 1건 승인
                                    요청</p>
                            </div>

                            <div className="flex flex-col justify-center pl-4">
                                <p className="text-[#4C545B] text-[12px]">2025.03.15</p>
                            </div>
                        </div>

                        <hr className="my-4 border-[0.5px] border-solid border-[#DBDBDB]"/>


                        <div className="flex flex-row justify-between p-1">
                            <div className="flex flex-col justify-between pr-4">
                                <div className="flex flex-row items-center gap-2 pb-1.5">
                                    <p className="weight-700">결제 승인 요청</p>
                                    <p className="text-[#1E7EE4] text-[14px] weight-500">New</p>
                                </div>

                                <p className="text-[14px] text-[#4C545B] weight-500">[DEVELOPER] 2025.03.10 카누 외 1건 승인
                                    요청</p>
                            </div>

                            <div className="flex flex-col justify-center pl-4">
                                <p className="text-[#4C545B] text-[12px]">2025.03.15</p>
                            </div>
                        </div>

                        <hr className="my-4 border-[0.5px] border-solid border-[#DBDBDB]"/>


                        <div className="flex flex-row justify-between p-1">
                            <div className="flex flex-col justify-between pr-4">
                                <div className="flex flex-row items-center gap-2 pb-1.5">
                                    <p className="weight-700">결제 승인 요청</p>
                                </div>

                                <p className="text-[14px] text-[#4C545B] weight-500">요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청</p>
                            </div>

                            <div className="flex flex-col justify-center pl-4">
                                <p className="text-[#4C545B] text-[12px]">2025.03.15</p>
                            </div>
                        </div>

                        <hr className="my-4 border-[0.5px] border-solid border-[#DBDBDB]"/>


                    </div>
                    <div
                        className="content-center text-center w-full h-[10%]">
                        {renderPagination(currentPage, totalPages, handlePageChange)}
                    </div>
                </div>

            </div>

        </div>
    );
}