import NotifyUI from "@/src/components/units/notify/Notify.presenter";
import { useState, useEffect } from "react";
import useSSE from "@/src/hooks/useSSE";
import axios from "axios";

export default function Notify() {
    const [selectedMenu, setSelectedMenu] = useState("동아리");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [allNotifications, setAllNotifications] = useState([]);

    const menuCategoryMap = {
        "동아리": "CLUB",
        "예산": "BUDGET",
        "통장 관리": "BANKBOOK"
    };

    const userId = 1;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedMenu]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`/notifications`, {
                    params: {
                        category: selectedMenu.toLowerCase(),
                        userId,
                        page: currentPage - 1,
                        size: 8,
                    }
                });
                const notifications = res.data.content.map(item => ({
                    title: item.title,
                    description: item.content,
                    date: item.createdAt,
                    isNew: item.isNew,
                    category: item.category,
                }));
                setAllNotifications(notifications);
                setData(notifications.filter(n => menuCategoryMap[selectedMenu] === n.category));
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.error("알림 목록 불러오기 실패", error);
            }
        };
        fetchNotifications();
    }, [selectedMenu, currentPage, userId]);

    useEffect(() => {
        const filtered = allNotifications.filter(n => menuCategoryMap[selectedMenu] === n.category);
        setTotalPages(Math.ceil(filtered.length / 8));
        setData(filtered.slice((currentPage - 1) * 8, currentPage * 8));
    }, [selectedMenu, allNotifications, currentPage]);

    useEffect(() => {
        const fetchCategoryCounts = async () => {
            try {
                const res = await axios.get(`/notifications/category-counts`, {
                    params: { userId }
                });
                setCategoryCounts(res.data.categoryCounts);
            } catch (error) {
                console.error("카테고리별 알림 개수 불러오기 실패", error);
            }
        };
        fetchCategoryCounts();
    }, [userId]);

    useSSE(userId, (newNotification) => {
        setAllNotifications(prev => {
            const updated = [newNotification, ...prev];
            return updated;
        });

        const categoryText = Object.keys(menuCategoryMap).find(key => menuCategoryMap[key] === newNotification.category);

        setCategoryCounts(prev => ({
            ...prev,
            [categoryText]: (prev[categoryText] ?? 0) + 1
        }));

        // ⭐ 페이지 수를 다시 계산해야 함
        const filtered = allNotifications.filter(n => menuCategoryMap[selectedMenu] === n.category);
        const newTotalPages = Math.ceil((filtered.length + 1) / 8); // +1은 새 알림까지 포함
        setTotalPages(newTotalPages);

        // ⭐ 페이지 이동 로직 (필요하면 자동으로 다음 페이지로 넘기게 할 수도 있음)
        if (filtered.length % 8 === 0) {
            setCurrentPage(1); // 예시: 새 알림 오면 1페이지로 강제 이동
        }
    });

    const sideMenus = {
        "동아리": "/notifications?category=club&userId=1&page=",
        "예산": "/notifications?category=budget&userId=1&page=",
        "통장 관리": "/notifications?category=bankbook&userId=1&page=",
    };

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
            categoryCounts={categoryCounts}
        />
    )
}