import { useState } from "react";
import Link from "next/link";

export default function SideBarLayout() {
    const [isBudgetMenuOpen, setBudgetMenuOpen] = useState(false);

    return (
        <div className="bg-gray-200 h-full flex flex-col p-6">
            <Link href="/main">
                <div className="text-black font-[Pretendard] text-[20px] font-bold leading-normal cursor-pointer">
                    동국대학교<br />동아리행정정보시스템
                </div>
            </Link>

            <ul className="flex flex-col space-y-6 mt-8">
                <li className="text-black font-[Pretendard] text-[16px] font-medium leading-normal hover:text-blue-600 cursor-pointer">
                    공지사항
                </li>
                <li className="text-black font-[Pretendard] text-[16px] font-medium leading-normal hover:text-blue-600 cursor-pointer">
                    동아리
                </li>
                <li>
                    <div
                        onClick={() => setBudgetMenuOpen(!isBudgetMenuOpen)}
                        className="text-black font-[Pretendard] text-[16px] font-medium leading-normal hover:text-blue-600 cursor-pointer"
                    >
                        예산
                    </div>
                    {isBudgetMenuOpen && (
                        <ul className="ml-4 mt-2 flex flex-col space-y-3">
                            <li className="text-[#414141] font-[Pretendard] text-[14px] font-medium leading-normal hover:text-blue-400 cursor-pointer">
                                예산 계획
                            </li>
                            <li className="text-[#414141] font-[Pretendard] text-[14px] font-medium leading-normal hover:text-blue-400 cursor-pointer">
                                예산 사용 내역
                            </li>
                            <li className="text-[#414141] font-[Pretendard] text-[14px] font-medium leading-normal hover:text-blue-400 cursor-pointer">
                                예산 보고서
                            </li>
                        </ul>
                    )}
                </li>
                <li className="text-black font-[Pretendard] text-[16px] font-medium leading-normal hover:text-blue-600 cursor-pointer">
                    통장관리
                </li>
                <li className="text-black font-[Pretendard] text-[16px] font-medium leading-normal hover:text-blue-600 cursor-pointer">
                    인원관리
                </li>
                <li className="text-black font-[Pretendard] text-[16px] font-medium leading-normal hover:text-blue-600 cursor-pointer">
                    일정
                </li>
            </ul>
        </div>
    );
}
