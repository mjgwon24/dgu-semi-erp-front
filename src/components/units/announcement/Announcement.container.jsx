import React, { useState } from "react";
import dayjs from "dayjs";
import AnnouncementUI from "@/src/components/units/announcement/Announcement.presenter";

export default function Announcement() {
    const announcements = [
        {title: '공지1', content: '공지내용 1 공지내용 1 공지내용 1 공지내용 1공지내용  1 공지내용 1공지내용 1 공지내용 1  ', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-08-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-08-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-08-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-08-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-08-12'},
        {title: '공지1', content: '공지내용 1 공지내용 1 공지내용 1 공지내용 1공지내용  1 공지내용 1공지내용 1 공지내용 1  ', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},
        {title: '공지1', content: '공지내용 1', date: '2024-01-12'},

        
    ]

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const announcementsPerPage = 6;

    // 날짜 필터링
    const filteredAnnouncements = announcements.filter((announcement) => {
        const announcementDate = dayjs(announcement.date);
        const isAfterStart = startDate ? announcementDate.isAfter(dayjs(startDate).subtract(1, 'day')) : true;
        const isBeforeEnd = endDate ? announcementDate.isBefore(dayjs(endDate).add(1, 'day')) : true;
        return isAfterStart && isBeforeEnd;
    });

    // 페이지네이션 (임시)
    const totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);
    const indexOfLastAnnouncement = currentPage * announcementsPerPage;
    const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
    const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

    return (
        <AnnouncementUI
            announcements={currentAnnouncements}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
        />
    )
}