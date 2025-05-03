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
    totalPages,
    renderPagination
}) {
    
    const { RangePicker } = DatePicker;
    const dateFormat = "YYYY-MM-DD";

    return (
        <div className="flex flex-col p-4 h-full gap-4">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <h3 className="text-xl weight-700">공지사항</h3>

                    <div className="flex flex-row gap-2 items-center">
                        <label className="weight-600 text-sm">조회 기간</label>
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

                <div className="border border-solid border-[#DBDBDB] rounded-md pl-1 pr-3 bg-white">
                    {announcements.length > 0 ? (
                        announcements.map((announcement, index) => (
                            <div key={index} className="flex flex-col w-full"
                                 style={{borderBottom: (index + 1) % 7 === 0 ?  "none" : "1px solid #DBDBDB",}}>
                                <Link key={announcement.id} href={`/announcement/${announcement.id}`} className="flex flex-col gap-2 p-5 h-full hover:bg-gray-100">
                                    <div className="flex flex-row justify-between">
                                        <p className="text-lg font-semibold">{announcement.title}</p>
                                        <p className="text-[#4C545B]">{dayjs(announcement.date).format("YYYY.MM.DD")}</p>
                                    </div>

                                    <p className="truncate w-[1200px] text-[#4C545B]">{announcement.content}</p>
                                </Link>

                            </div>
                        ))
                    ) : (
                        <p className="p-4 text-center text-gray-500">공지사항이 없습니다.</p>
                    )}
                </div>
            </div>

            <div className="flex justify-center gap-4">
                {renderPagination(currentPage,totalPages)}
            </div>
        </div>
    );
}
