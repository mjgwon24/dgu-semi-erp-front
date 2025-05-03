import dayjs from "dayjs";
import React, { useState } from "react";
import Link from "next/link";
import { DatePicker, Space } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { BorderBottom } from "@mui/icons-material";
dayjs.extend(customParseFormat);

export default function AnnouncementDetailUI({
    announcement,
    date,
    id,
    title
}) {

    return (
        <div className="flex flex-col p-4 gap-4">
            <h3 className="text-xl weight-700">공지사항</h3>
            <div className="flex flex-col border border-[#DBDBDB] bg-white rounded-lg pt-10 pb-16 px-12 h-[750px]">
                <div className="flex flex-col gap-2 pb-4 border-b border-[#DBDBDB]">
                    <lable className="text-xl font-bold">공지 제목</lable>

                    <div className="flex flex-row gap-4 text-sm text-[#4C545B]">
                        <lable className="">2024.01.12</lable>
                        <lable className="">|</lable>
                        <lable className="">작성자</lable>
                        <lable className="">|</lable>
                        <lable>조회수</lable>
                    </div>
                </div>

                <div className="h-full py-4 text-base text-[#4C545B] border-b border-[#DBDBDB]">
                    <p>{id}</p>
                </div>

                <div className="text-sm pt-4 text-[#4C545B]">
                    <Link href={"/announcement"}>← 목록으로</Link>
                </div>
            </div>
            
            
        </div>
    );
}
