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
        <div className="bg-[#212121] h-full flex flex-col p-6 min-w-[205px]">
            <Link href="/main" className="cursor-pointer">
                <h1 className="text-white weight-700 text-[17px]">동국대학교<br/>동아리행정정보시스템</h1>
            </Link>

            <ul className="flex flex-col space-y-5 pt-10">
                <li className="flex items-center text-white cursor-pointer weight-700">
                    <Link href="/main" className="cursor-pointer flex items-center space-x-3">
                        <ArticleIcon fontSize="small" />
                        <span>공지사항</span>
                    </Link>
                </li>
                <li className="flex items-center text-white cursor-pointer weight-700">
                    <Link href="/main" className="cursor-pointer flex items-center space-x-3">
                        <GroupsIcon fontSize="small" />
                        <span>동아리</span>
                    </Link>
                </li>
                <li>
                    <div
                        onClick={() => setBudgetMenuOpen(!isBudgetMenuOpen)}
                        className="flex items-center space-x-3 text-white cursor-pointer weight-700"
                    >
                        <CreditCardIcon fontSize="small" />
                        <span>예산</span>
                    </div>
                    {isBudgetMenuOpen && (
                        <ul className="ml-8 mt-2 flex flex-col space-y-2">
                            <li className="text-gray-300 cursor-pointer text-[15px] weight-700">
                                <Link href="/budgetPlan" className="cursor-pointer flex items-center space-x-3">
                                    예산 계획
                                </Link>
                            </li>
                            <li className="text-gray-300 cursor-pointer text-[15px] weight-700">
                                <Link href="/budgetUsage" className="cursor-pointer flex items-center space-x-3">
                                    예산 사용 내역
                                </Link>
                            </li>
                            <li className="text-gray-300 cursor-pointer text-[15px] weight-700">
                                <Link href="/budgetReport" className="cursor-pointer flex items-center space-x-3">
                                    예산 보고서
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className="flex items-center text-white weight-700 cursor-pointer">
                    <Link href="/bankbookManagement" className="cursor-pointer flex items-center space-x-3">
                        <PointOfSaleIcon fontSize="small" />
                        <span>통장관리</span>
                    </Link>
                </li>
                <li className="flex items-center text-white weight-700 cursor-pointer">
                    <Link href="/peopleManagement" className="cursor-pointer flex items-center space-x-3">
                        <PersonSearchIcon fontSize="small" />
                        <span>인원관리</span>
                    </Link>
                </li>
                <li className="flex items-center text-white font-normal cursor-pointer">
                    <Link href="/main" className="cursor-pointer flex items-center space-x-3">
                        <CalendarMonthIcon fontSize="small" />
                        <span>일정</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}