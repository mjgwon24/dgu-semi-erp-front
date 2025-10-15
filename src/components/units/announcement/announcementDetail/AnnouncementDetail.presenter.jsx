import dayjs from "dayjs";
import React, { useState } from "react";
import Link from "next/link";
import { DatePicker, Space } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { BorderBottom } from "@mui/icons-material";
dayjs.extend(customParseFormat);

export default function AnnouncementDetailUI({
    id,
    announcement
}) {

    return (
        <div className="flex flex-col p-4 gap-4">
            <h3 className="text-xl weight-700">공지사항</h3>
            <div className="flex flex-col border border-[#DBDBDB] bg-white rounded-lg pt-10 pb-16 px-12 h-[750px]">
                <div className="flex flex-col gap-2 pb-4 border-b border-[#DBDBDB]">
                    <lable className="text-xl font-bold">{announcement.title}</lable>

                    <div className="flex flex-row gap-4 text-sm text-[#4C545B]">
                        <lable className="">{dayjs(announcement.updatedAt).format("YYYY-MM-DD")}</lable>
                        <lable className="">|</lable>
                        {/* 랜더링후 작성자가 안뜨는 문제 발생하여 '?'추가함. */}
                        <lable className="">{announcement?.author}</lable>
                        <lable className="">|</lable>
                        <lable>{announcement?.viewCount}</lable>
                    </div>
                </div>

                <div className="h-full py-4 text-base text-[#4C545B] border-b border-[#DBDBDB]">
                    <p>{announcement?.content}</p>
                </div>

                <div className="text-sm pt-4 text-[#4C545B]">
                    <Link href={"/announcement"}>← 목록으로</Link>
                </div>
            </div>
            
            
        </div>
    );
}
