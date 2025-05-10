import React from 'react';
import { renderPagination } from "@/src/components/common/layout/table/pagination";

export default function NotifyUI({ currentPage, totalPages, handlePageChange, selectedMenu, setSelectedMenu, sideMenus, data, categoryCounts }) {
    return (
        <div className="flex flex-col gap-5 p-5 h-full">
            <div className="flex flex-col gap-2">
                <div>
                    <h3 className="text-xl weight-700">알림</h3>
                </div>
            </div>

            <div className="flex flex-row gap-3 w-full h-full">
                <div className="flex flex-col gap-2 w-[210px] min-w-[140px] text-[15px]">
                    {Object.keys(sideMenus).map((menu) => (
                        <div
                            key={menu}
                            className={`flex flex-row justify-between cursor-pointer border border-solid rounded-lg px-5 py-3 hover:bg-[#F0F7FF] hover:border-[#1E7EE4] hover:text-[#1E7EE4] transform duration-300
                                ${selectedMenu === menu ? 'border-[#1E7EE4] bg-[#F0F7FF]' : 'bg-white'}`}
                            onClick={() => setSelectedMenu(menu)}>
                            <p className={`${selectedMenu === menu ? 'weight-700 text-[#1E7EE4]' : 'weight-600'}`}>{menu}</p>
                            <p className="text-[#808080] weight-500">{categoryCounts[menu] || 0}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col w-full h-fit">
                    <div
                        className="flex-grow overflow-auto w-full h-fit border border-solid border-[#DBDBDB] rounded-lg px-8 py-2 bg-white">
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <>
                                    <div className="flex flex-row justify-between px-1 py-4" key={index}>
                                        <div className="flex flex-col justify-between pr-4">
                                            <div className="flex flex-row items-center gap-2 pb-1.5">
                                                <p className="weight-700">{item.title}</p>
                                                {item.isNew && (
                                                    <p className="text-[#1E7EE4] text-[14px] weight-500">New</p>
                                                )}
                                            </div>

                                            <p className="text-[14px] text-[#4C545B] weight-500">{item.description}</p>
                                        </div>

                                        <div className="flex flex-col justify-center pl-4">
                                            <p className="text-[#4C545B] text-[12px]">{item.date}</p>
                                        </div>
                                    </div>

                                    {index < data.length - 1 && (
                                        <hr className="border-[0.5px] border-solid border-[#DBDBDB]"/>
                                    )}
                                </>
                            ))
                        ) : (
                            <div className="flex flex-col justify-center items-center min-h-[300px]">
                                <p className="text-[#4C545B] text-[14px] weight-500">알림이 없습니다.</p>
                            </div>
                        )}
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