import dayjs from "dayjs";
import React, { useState } from "react";
import Link from "next/link";
import { DatePicker, Space } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default function AnnouncementUI({
    announcements,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    currentPage,
    setCurrentPage,
    totalPages
}) {
    
    const { RangePicker } = DatePicker;
    const dateFormat = "YYYY-MM-DD";

    return (
        <div className="flex flex-col p-4 h-full gap-4">
            <div className="flex justify-between">
                <label className="text-xl font-bold">공지사항</label>
                <div className="flex flex-row gap-4 items-center">
                    <label className="font-bold">조회 기간</label>
                    <RangePicker
                        value={[startDate ? dayjs(startDate) : null, endDate ? dayjs(endDate) : null]}
                        format={dateFormat}
                        onChange={(dates) => {
                            if (dates) {
                                setStartDate(dates[0]?.format(dateFormat) || "");
                                setEndDate(dates[1]?.format(dateFormat) || "");
                            } else {
                                setStartDate("");
                                setEndDate("");
                            }
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col border border-[#DBDBDB] rounded-lg flex-1 ">
                {announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                        <div
                            key={index}
                            className="flex flex-col w-full h-full"
                            style={{
                                borderBottom: (index + 1) % 6 === 0 ?  "none" : "1px solid #DBDBDB",
                                height: "16.6667%"
                            }}
                        >
                            <Link key={announcement.id} href={`/announcement/${announcement.id}`} className="flex flex-col gap-4 p-5 h-full hover:bg-gray-100">
                                <div className="flex flex-row justify-between">
                                    <p className="text-lg font-semibold">{announcement.title}</p>
                                    <p style={{ color: "#4C545B" }}>{dayjs(announcement.date).format("YYYY.MM.DD")}</p>
                                </div>
                                <p className="truncate w-[1200px]" style={{ color: "#4C545B" }}>{announcement.content}</p>
                            </Link>
                            
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-center text-gray-500">공지사항이 없습니다.</p>
                )}

            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-md"
                    style={{ color: "#3A3A3A" }}
                >
                    {"<"}
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 ${currentPage === index + 1 ? "text-black" : "text-gray-500"} rounded-md mx-1`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-md"
                    style={{ color: "#3A3A3A" }}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}
