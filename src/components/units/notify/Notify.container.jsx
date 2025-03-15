import NotifyUI from "@/src/components/units/notify/Notify.presenter";
import {useState} from "react";

export default function Notify() {
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
        />
    )
}