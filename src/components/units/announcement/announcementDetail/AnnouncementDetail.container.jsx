import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from 'axios';
import AnnouncementDetailUI from "@/src/components/units/announcement/announcementDetail/AnnouncementDetail.presenter";

export default function AnnouncementDetail({id}) {
    const [announcement, setAnnouncement] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/api/announcement/${id}`)
            .then(res => {
                setAnnouncement(res.data);
                console.log("공지사항:", res.data);
            })
            .catch(err => {
                console.error("공지사항 조회 실패", err);
            });
    }, [id]);
    
    return (
        <AnnouncementDetailUI
            id = {id}
            announcement = {announcement}
        />
    )
}