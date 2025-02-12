import { useState } from "react";
import Link from "next/link";
import ArticleIcon from "@mui/icons-material/Article";
import GroupsIcon from "@mui/icons-material/Groups";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function SideBarLayout() {
    const [isBudgetMenuOpen, setBudgetMenuOpen] = useState(false);

    return (
        <div className="bg-[#212121] h-full flex flex-col p-6 text-white">
            <Link href="/main">
                <div className="text-white font-[Pretendard] pt-3 text-[18px] font-bold leading-normal cursor-pointer">
                    동국대학교<br />동아리행정정보시스템
                </div>
            </Link>

            <ul className="flex flex-col space-y-9 mt-4 pt-7">
                <li className="flex items-center space-x-3 text-white text-[16px] font-normal cursor-pointer">
                    <ArticleIcon fontSize="medium" />
                    <span>공지사항</span>
                </li>
                <li className="flex items-center space-x-3 text-white text-[16px] font-normal  cursor-pointer">
                    <GroupsIcon fontSize="medium" />
                    <span>동아리</span>
                </li>
                <li>
                    <div
                        onClick={() => setBudgetMenuOpen(!isBudgetMenuOpen)}
                        className="flex items-center space-x-3 text-white text-[16px] font-normal cursor-pointer"
                    >
                        <CreditCardIcon fontSize="medium" />
                        <span>예산</span>
                    </div>
                    {isBudgetMenuOpen && (
                        <ul className="ml-4 mt-2 flex flex-col space-y-3">
                            <li className="text-gray-300 text-[14px] font-normal cursor-pointer">
                                예산 계획
                            </li>
                            <li className="text-gray-300 text-[14px] font-normal cursor-pointer">
                                예산 사용 내역
                            </li>
                            <li className="text-gray-300 text-[14px] font-normal cursor-pointer">
                                예산 보고서
                            </li>
                        </ul>
                    )}
                </li>
                <li className="flex items-center space-x-3 text-white text-[16px] font-normal  cursor-pointer">
                    <PointOfSaleIcon fontSize="medium" />
                    <span>통장관리</span>
                </li>
                <li className="flex items-center space-x-3 text-white text-[16px] font-normal  cursor-pointer">
                    <PersonSearchIcon fontSize="medium" />
                    <span>인원관리</span>
                </li>
                <li className="flex items-center space-x-3 text-white text-[16px] font-normal cursor-pointer">
                    <CalendarMonthIcon fontSize="medium" />
                    <span>일정</span>
                </li>
            </ul>
        </div>
    );
}