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
        <div className="flex flex-col p-4 h-full gap-4">
            <label className="text-xl font-bold">공지사항</label>
            <div className="flex flex-col border border-[#DBDBDB] rounded-lg flex-1 p-16">
                <div className="flex flex-col gap-2 pb-4" style={{borderBottom : "2px solid #DBDBDB"}}>
                    <lable className="text-xl font-bold">공지 제목</lable>
                    <div className="flex flex-row gap-4 text-sm" style={{color:"#4C545B"}}>
                        <lable className="">2024.01.12</lable>
                        <lable className="">|</lable>
                        <lable className="">작성자</lable>
                        <lable className="">|</lable>
                        <lable>조회수</lable>
                    </div>
                </div>
                <div className="pt-4 text-base h-full" style={{color:"#4C545B", borderBottom : "2px solid #DBDBDB"}}>
                    <p>{id}</p>
                </div>
                <div className="text-sm pt-4" style={{color: "#4C545B"}}>
                    <Link href={"/announcement"}>← 목록으로</Link>
                    
                </div>
            </div>
            
            
        </div>
    );
}
