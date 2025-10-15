import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import AnnouncementUI from "@/src/components/units/announcement/Announcement.presenter";

export default function Announcement() {
    const [announcements, setAnnouncements] = useState([]);

    // 필터링 할 날짜, 페이지네이션
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // const announcementsPerPage = 7; 프론트랑 백단 충돌남

    useEffect(() => {
        // 백 로컬단 주소, 페이지네이션은 백단에서 0부터 시작이라 줄여둠
        axios.get(`http://localhost:8081/api/announcement?page=${currentPage - 1}`,{
            params: {
                page: currentPage,
                startDate: startDate || undefined,
                endDate: endDate || undefined
            }
        })
            .then((res) => {
                console.log("응답 데이터:", res.data.content);
                console.log("타입 확인:", Array.isArray(res.data)); 
                setAnnouncements(res.data.content); // 배열로 주기 위해서
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
                console.error("공지사항 로드 실패", err);
            });
    }, [currentPage, startDate, endDate]); // 페이지, 시작날짜, 끝날짜 변환되면 감지

    // 날짜 필터링
    const filteredAnnouncements = announcements.filter((announcement) => {
        const announcementDate = dayjs(announcement.updatedAt);
        const isAfterStart = startDate ? announcementDate.isAfter(dayjs(startDate).subtract(1, 'day')) : true;
        const isBeforeEnd = endDate ? announcementDate.isBefore(dayjs(endDate).add(1, 'day')) : true;
        return isAfterStart && isBeforeEnd;
    });

    // 페이지네이션 (임시)
    // const totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);
    // const indexOfLastAnnouncement = currentPage * announcementsPerPage;
    // const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
    const currentAnnouncements = filteredAnnouncements;

    const [pageSize,setPageSize] = useState(7); // 한 페이지당 항목 수

    const onRowClick = (index)=>{
        setSelected(selected==index?-1:index);//토글
    }

    // 페이지네이션 버튼 생성 함수
    const generatePageButton = (page) => (
        <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${page==currentPage?'text-[#000000] font-bold':'text-[#5E5E5E]'} px-1`}
        >
            {page}
        </button>
    );

    // 페이지 전환 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 페이지네이션 생성 함수
    const renderPagination = (currentPage,totalPages) => {
        if(totalPages==0)
            return;
        const pages = [];

        // 항상 첫 페이지와 마지막 페이지 표시
        const firstPage = 1;
        const lastPage = totalPages;
        // 처음으로 이동 버튼
        // pages.push(
        //     <button
        //     key="first"
        //     onClick={() => handlePageChange(1)}
        //     className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
        //     >
        //     &lt;&lt;
        //     </button>
        // );

        // 이전 버튼
        pages.push(
            <button
                key="prev"
                onClick={() => {handlePageChange((currentPage-2+totalPages)%totalPages+1)}}
                className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
            >
                &lt;
            </button>
        );
        // 페이지가 6개 이하일 경우 모두 표시
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(generatePageButton(i));
            }
            // "다음" 버튼 추가
            pages.push(
                <button
                    key="next"
                    onClick={() => {handlePageChange((currentPage%totalPages)+1)}}
                    className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
                >
                    &gt;
                </button>
            );

            // 끝으로 이동 버튼
            // pages.push(
            //     <button
            //       key="last"
            //       onClick={() => handlePageChange(totalPages)}
            //       className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
            //     >
            //       &gt;&gt;
            //     </button>
            //   );
            return pages;
        }

        // 첫 페이지 추가
        pages.push(generatePageButton(firstPage));

        // 현재 페이지가 3 이상일 경우 앞 부분 생략 표시
        if (currentPage > 3) {
            pages.push(<span key="dots1" className='text-[#3A3A3A] py-2'>...</span>);
        }

        // 현재 페이지 기준으로 앞뒤 2개 페이지 표시
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(generatePageButton(i));
        }

        // 현재 페이지가 마지막에서 2개 이상 떨어져 있으면 뒷부분 생략 표시
        if (currentPage < totalPages - 2) {
            pages.push(<span key="dots2" className='text-[#3A3A3A] py-2'>...</span>);
        }

        // 마지막 페이지 버튼
        pages.push(generatePageButton(lastPage));
        // 다음 버튼
        pages.push(
            <button
                key="next"
                onClick={() => {handlePageChange((currentPage%totalPages)+1)}}
                className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
            >
                &gt;
            </button>
        );

        // 끝으로 이동 버튼
        //   pages.push(
        //     <button
        //       key="last"
        //       onClick={() => handlePageChange(totalPages)}
        //       className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
        //     >
        //       &gt;&gt;
        //     </button>
        //   );

        return pages;
    };

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
            renderPagination={renderPagination}
        />
    )
}