import dayjs from "dayjs";
import React, { useState } from "react";
import Link from "next/link";
import { DatePicker, Space } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { BorderBottom } from "@mui/icons-material";
import ModifyAnnouncementContainer from "../../../../components/common/modals/ModifyAnnouncement/ModifyAnnouncement.container.jsx";
dayjs.extend(customParseFormat);

export default function AnnouncementDetailUI({
    id,
    announcement
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
