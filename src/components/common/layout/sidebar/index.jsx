import { useState } from "react";
import Link from "next/link";
import ArticleIcon from "@mui/icons-material/Article";
import GroupsIcon from "@mui/icons-material/Groups";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {usePathname} from "next/navigation";
import {ArrowBackIos} from "@mui/icons-material";

export default function SideBarLayout() {
    const [isBudgetMenuOpen, setBudgetMenuOpen] = useState(false);
    const currentUrl = usePathname();
    const [isSidebarFolded, setIsSidebarFolded] = useState(false);

    return (
        <div className="flex flex-col justify-between h-full bg-gradient-to-b from-[#4A96EC] via-[#4A96EC] to-[#237BE6]"
                style={{
                        width: isSidebarFolded ? "70px" : "210px"
                    }}
        >
            <div className="flex flex-col"
                 style={{ padding: "20px 10px 20px 10px"}}>
                <Link href="/main" className="cursor-pointer">
                    <h1 className="text-white weight-700 text-[17px]"
                        style={{fontSize: isSidebarFolded ? "10px" : "17px",
                            paddingLeft: isSidebarFolded ? "2px" : "10px"
                        }}
                    >
                        동국대학교<br/>동아리행정정보시스템
                    </h1>
                </Link>

                <ul className="flex flex-col space-y-5 pt-10"
                    style={{display: isSidebarFolded ? "none" : ""}}
                >
                    <li className="flex items-center text-white cursor-pointer weight-700 rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25 "
                        style={{
                            backgroundColor: currentUrl === "/announcement" ? "white" : "",
                            color: currentUrl === "/announcement" ? "#106BDB" : ""
                        }}
                    >
                        <Link href="/announcement" className="cursor-pointer flex items-center space-x-3">
                            <ArticleIcon fontSize="small"/>
                            <span className="select-none weight-600 text-[#FDFDFD]"
                                  style={{
                                      color: currentUrl === "/announcement" ? "#106BDB"
                                          : ""
                                  }}>공지사항</span>
                        </Link>
                    </li>
                    <li className="flex items-center text-white cursor-pointer weight-700 rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25"
                        style={{
                            backgroundColor: currentUrl === "/clubManagement" ? "white" : "",
                            color: currentUrl === "/clubManagement" ? "#106BDB" : ""
                        }}
                    >
                        <Link href="/main" className="cursor-pointer flex items-center space-x-3">
                            <GroupsIcon fontSize="small"/>
                            <span className="select-none weight-600 text-[#FDFDFD]"
                                  style={{
                                      color: currentUrl === "/main" ? "#106BDB"
                                          : ""
                                  }}>동아리</span>
                        </Link>
                    </li>
                    <li>
                        <div
                            onClick={() => setBudgetMenuOpen(!isBudgetMenuOpen)}
                            className="flex items-center space-x-3 text-white cursor-pointer weight-700 rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25"
                            style={{
                                backgroundColor: currentUrl === "/budgetPlan" || currentUrl === "/budgetUsage" || currentUrl === "/budgetReport" ? "white"
                                    : isBudgetMenuOpen ? "#EFF7FF" : "",
                                color: currentUrl === "/budgetPlan" || currentUrl === "/budgetUsage" || currentUrl === "/budgetReport" ? "#106BDB"
                                    : ""
                            }}
                        >
                            <CreditCardIcon fontSize="small" style={{color: currentUrl === "/budgetPlan" || currentUrl === "/budgetUsage" || currentUrl === "/budgetReport" || isBudgetMenuOpen ? "#106BDB"
                                : ""}}/>
                            <span className="select-none weight-600 text-[#FDFDFD]"
                                  style={{
                                        color: currentUrl === "/budgetPlan" || currentUrl === "/budgetUsage" || currentUrl === "/budgetReport" || isBudgetMenuOpen ? "#106BDB"
                                            : ""
                                  }}

                            >예산</span>
                        </div>
                        {isBudgetMenuOpen && (
                            <ul className="ml-2 mt-2 flex flex-col space-y-2">
                                <li className="text-gray-300 cursor-pointer text-[15px] weight-700 rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25 "
                                    style={{backgroundColor: currentUrl === "/budgetPlan" ? "#69A9F5" : ""}}
                                >
                                    <Link href="/budgetPlan"
                                          className="cursor-pointer flex items-center space-x-3 select-none text-[#FDFDFD]">
                                        예산 계획
                                    </Link>
                                </li>
                                <li className="text-gray-300 cursor-pointer text-[15px] weight-700 rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25 "
                                    style={{backgroundColor: currentUrl === "/budgetUsage" ? "#69A9F5" : ""}}
                                >
                                    <Link href="/budgetUsage"
                                          className="cursor-pointer flex items-center space-x-3 select-none text-[#FDFDFD]">
                                        예산 사용 내역
                                    </Link>
                                </li>
                                <li className="text-gray-300 cursor-pointer text-[15px] weight-700 rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25 "
                                    style={{backgroundColor: currentUrl === "/budgetReport" ? "#69A9F5" : ""}}
                                >
                                    <Link href="/budgetReport"
                                          className="cursor-pointer flex items-center space-x-3 select-none text-[#FDFDFD]">
                                        예산 보고서
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="flex items-center text-white weight-700 cursor-pointer rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25 "
                        style={{
                            backgroundColor: currentUrl === "/bankbookManagement" ? "white" : "",
                            color: currentUrl === "/bankbookManagement" ? "#106BDB" : ""
                        }}
                    >
                        <Link href="/bankbookManagement" className="cursor-pointer flex items-center space-x-3">
                            <PointOfSaleIcon fontSize="small"/>
                            <span className="select-none weight-600 text-[#FDFDFD]"
                                  style={{
                                      color: currentUrl === "/bankbookManagement" ? "#106BDB"
                                          : ""
                                  }}>통장관리</span>
                        </Link>
                    </li>
                    <li className="flex items-center text-white weight-700 cursor-pointer rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25 "
                        style={{
                            backgroundColor: currentUrl === "/peopleManagement" ? "white" : "",
                            color: currentUrl === "/peopleManagement" ? "#106BDB" : ""
                        }}
                    >
                        <Link href="/peopleManagement" className="cursor-pointer flex items-center space-x-3">
                            <PersonSearchIcon fontSize="small"/>
                            <span className="select-none weight-600 text-[#FDFDFD]"
                                  style={{
                                      color: currentUrl === "/peopleManagement" ? "#106BDB"
                                          : ""
                                  }}>인원관리</span>
                        </Link>
                    </li>
                    <li className="flex items-center text-white font-normal cursor-pointer rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25 "
                        style={{
                            backgroundColor: currentUrl === "/generalSchedule" ? "white" : "",
                            color: currentUrl === "/generalSchedule" ? "#106BDB" : ""
                        }}
                    >
                        <Link href="/generalSchedule" className="cursor-pointer flex items-center space-x-3">
                            <CalendarMonthIcon fontSize="small"/>
                            <span className="select-none weight-600 text-[#FDFDFD]"
                                  style={{
                                      color: currentUrl === "/generalSchedule" ? "#106BDB"
                                          : ""
                                  }}>일정</span>
                        </Link>
                    </li>
                </ul>
            </div>


            <div className="cursor-pointer px-4 py-6" onClick={() => setIsSidebarFolded(!isSidebarFolded)}>
                <div className="w-8 h-8 flex justify-center items-center rounded-[50%] bg-[#569CEF]">
                    <ArrowBackIos className="text-[#DFE5EC]" fontSize="small"
                                  style={{
                                      transform: isSidebarFolded ? "rotate(180deg)" : ""
                                      , marginRight: isSidebarFolded ? "7px" : "-7px"
                                  }}
                    />
                </div>
            </div>
        </div>
    );
}