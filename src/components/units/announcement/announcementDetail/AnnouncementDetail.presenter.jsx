import dayjs from "dayjs";
import React, { useState } from "react";
import Link from "next/link";
import { DatePicker, Space } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { BorderBottom } from "@mui/icons-material";
import ModifyAnnouncementContainer from "../../../../components/common/modals/ModifyAnnouncement/ModifyAnnouncement.container.jsx";
dayjs.extend(customParseFormat);

export default function AnnouncementDetailUI({
    announcement,
    date,
    id,
    title
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    return (
        <div className="flex flex-col p-4 gap-4">
            <ModifyAnnouncementContainer isOpen={isModalOpen} onClose={openModal} onSave={()=>{}}/>
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

                <div className="flex flew-row justify-between py-4">
                    <div className="text-sm pt-4 text-[#4C545B]">
                        <Link href={"/announcement"}>← 목록으로</Link>
                    </div>
                    <div className="flex flex-row gap-6">
                        <div className="px-6 bg-[#1E7EE4] py-2 text-[#FFFFFF] rounded-xl font-bold cursor-pointer" onClick={()=>{setIsModalOpen(true);}}>
                            수정
                        </div>
                        <div className="px-6 bg-[#D11E1E] py-2 text-[#FFFFFF] rounded-xl font-bold cursor-pointer">
                            삭제
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}
