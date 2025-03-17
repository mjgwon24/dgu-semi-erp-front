import NotifyUI from "@/src/components/units/notify/Notify.presenter";
import {useState} from "react";

export default function Notify() {
    /**
     * 알림 사이드 메뉴
     * - 한 페이지당 7개의 알림
     */
    const [selectedMenu, setSelectedMenu] = useState("동아리");
    const [data, setData] = useState([
            {
                title: "동아리 가입 승인",
                description: "동아리 가입이 승인되었습니다.",
                date: "2021-09-01",
                isNew: true
            },
        {
            title: "동아리 가입 승인",
            description: "동아리 가입이 승인되었습니다.",
            date: "2021-09-01",
            isNew: true
        },
        {
            title: "동아리 가입 승인",
            description: "동아리 가입이 승인되었습니다.",
            date: "2021-09-01",
            isNew: false
        },
        {
            title: "동아리 가입 승인",
            description: "동아리 가입이 승인되었습니다.",
            date: "2021-09-01",
            isNew: false
        },
        {
            title: "동아리 가입 승인",
            description: "동아리 가입이 승인되었습니다.",
            date: "2021-09-01",
            isNew: false
        },
        {
            title: "동아리 가입 승인",
            description: "동아리 가입이 승인되었습니다.",
            date: "2021-09-01",
            isNew: false
        },
            {
                title: "결제 승인 요청",
                description: "[DEVELOPER] 2025.03.10 카누 외 1건 승인 요청",
                date: "2025.03.15",
                isNew: false
            }
        ]);

    const sideMenus = {
        "동아리": "/api/notify/club?page=",
        "예산": "/api/notify/budget?page=",
        "통장 관리": "/api/notify/account?page=",
    }

    // api 호출 -> setData 필요

    /**
     * 페이지네이션
     */
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 8;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <NotifyUI
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            sideMenus={sideMenus}
            data={data}
        />
    )
}