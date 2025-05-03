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

    const menuBaseClass =
        "flex items-center cursor-pointer space-x-3 rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25 w-full";
    const textBaseClass = "select-none weight-700 text-[#FDFDFD]";

    return (
        <div className="flex flex-col justify-between h-full bg-gradient-to-b from-[#4A96EC] via-[#4A96EC] to-[#237BE6]"
                style={{
                        width: isSidebarFolded ? "70px" : "210px"
                    }}
        >
            <div className="flex flex-col"
                 style={{padding: isSidebarFolded ? "30px 10px 20px 10px"
                         : "30px 20px 20px 20px"}}>

                <Link href="/main"
                      className="cursor-pointer"
                      onClick={() => setBudgetMenuOpen(false)}>
                    <h1 className="text-white weight-700 text-[17px]"
                        style={{fontSize: isSidebarFolded ? "10px" : "18px",
                            paddingLeft: isSidebarFolded ? "2px" : "10px"
                        }}>
                        동국대학교<br/>동아리행정정보시스템
                    </h1>
                </Link>

                <div className="flex flex-col space-y-5 pt-10" style={{ display: isSidebarFolded ? "none" : "" }}>
                    <Link href="/announcement"
                          className={`${menuBaseClass} 
                          ${currentUrl === "/announcement" ? "bg-white text-[#106BDB]" : "text-white"}`}
                          style={{color: currentUrl === "/announcement" ? "#106BDB" : "", backgroundColor: currentUrl === "/announcement" ? "white" : "",}}
                          onClick={() => setBudgetMenuOpen(false)}>
                        <ArticleIcon fontSize="small" />
                        <span className={textBaseClass} style={{color: currentUrl === "/announcement" ? "#106BDB" : "",}}>
                            공지사항
                        </span>
                    </Link>

                    <Link href="/main"
                          className={`${menuBaseClass} ${currentUrl === "/clubManagement" ? "bg-white text-[#106BDB]" : "text-white"}`}
                          style={{color: currentUrl === "/clubManagement" ? "#106BDB" : "", backgroundColor: currentUrl === "/clubManagement" ? "white" : "",}}
                          onClick={() => setBudgetMenuOpen(false)}>
                        <GroupsIcon fontSize="small" />
                        <span className={textBaseClass}
                              style={{color: currentUrl === "/clubManagement" ? "#106BDB" : "",}}>
                            동아리
                        </span>
                    </Link>

                    <div className={`${menuBaseClass} ${isBudgetMenuOpen ? "bg-[#EFF7FF]" : ""}`}
                         style={{
                             backgroundColor:
                                 currentUrl === "/budgetPlan" ||
                                 currentUrl === "/budgetUsage" ||
                                 currentUrl === "/budgetReport"
                                     ? "white"
                                     : isBudgetMenuOpen
                                         ? "#EFF7FF"
                                         : "",
                             color:
                                 currentUrl === "/budgetPlan" ||
                                 currentUrl === "/budgetUsage" ||
                                 currentUrl === "/budgetReport"
                                     ? "#106BDB"
                                     : "",
                         }}
                         onClick={() => setBudgetMenuOpen((prev) => !prev)}>
                        <CreditCardIcon
                            fontSize="small"
                            style={{
                                color:
                                    currentUrl === "/budgetPlan" ||
                                    currentUrl === "/budgetUsage" ||
                                    currentUrl === "/budgetReport" ||
                                    isBudgetMenuOpen
                                        ? "#106BDB"
                                        : "white",
                            }}/>
                        <span
                            className={textBaseClass}
                            style={{
                                color:
                                    currentUrl === "/budgetPlan" ||
                                    currentUrl === "/budgetUsage" ||
                                    currentUrl === "/budgetReport" ||
                                    isBudgetMenuOpen
                                        ? "#106BDB"
                                        : "",
                            }}>
                            예산
                        </span>
                    </div>

                    {isBudgetMenuOpen && (
                        <div className="ml-2 mt-2 flex flex-col space-y-2">
                            <Link href="/budgetPlan"
                                  className="text-gray-300 cursor-pointer text-[15px] weight-700 rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25 w-full flex items-center"
                                  style={{backgroundColor: currentUrl === "/budgetPlan" ? "#69A9F5" : "", color: currentUrl === "/budgetPlan" ? "#fff" : "",}}
                                  onClick={() => setBudgetMenuOpen(false)}>
                                예산 계획
                            </Link>

                            <Link href="/budgetUsage"
                                  className="text-gray-300 cursor-pointer text-[15px] weight-700 rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25 w-full flex items-center"
                                  style={{backgroundColor: currentUrl === "/budgetUsage" ? "#69A9F5" : "", color: currentUrl === "/budgetUsage" ? "#fff" : "",}}
                                  onClick={() => setBudgetMenuOpen(false)}>
                                예산 사용 내역
                            </Link>

                            <Link href="/budgetReport"
                                  className="text-gray-300 cursor-pointer text-[15px] weight-700 rounded-md py-1.5 px-3 hover:bg-white hover:bg-opacity-25 w-full flex items-center"
                                  style={{backgroundColor: currentUrl === "/budgetReport" ? "#69A9F5" : "", color: currentUrl === "/budgetReport" ? "#fff" : "",}}
                                  onClick={() => setBudgetMenuOpen(false)}>
                                예산 보고서
                            </Link>
                        </div>
                    )}

                    <Link href="/bankbookManagement"
                          className={`${menuBaseClass} ${currentUrl === "/bankbookManagement" ? "bg-white text-[#106BDB]" : "text-white"}`}
                          style={{color: currentUrl === "/bankbookManagement" ? "#106BDB" : "", backgroundColor: currentUrl === "/bankbookManagement" ? "white" : "",}}
                          onClick={() => setBudgetMenuOpen(false)}>
                        <PointOfSaleIcon fontSize="small" />
                        <span className={textBaseClass}
                              style={{color: currentUrl === "/bankbookManagement" ? "#106BDB" : "",}}>
                            통장관리
                        </span>
                    </Link>

                    <Link href="/peopleManagement"
                          className={`${menuBaseClass} ${currentUrl === "/peopleManagement" ? "bg-white text-[#106BDB]" : "text-white"}`}
                          style={{color: currentUrl === "/peopleManagement" ? "#106BDB" : "", backgroundColor: currentUrl === "/peopleManagement" ? "white" : "",}}
                          onClick={() => setBudgetMenuOpen(false)}>
                        <PersonSearchIcon fontSize="small" />
                        <span className={textBaseClass}
                              style={{color: currentUrl === "/peopleManagement" ? "#106BDB" : "",}}>
                            인원관리
                        </span>
                    </Link>

                    <Link href="/generalSchedule"
                          className={`${menuBaseClass} ${currentUrl === "/generalSchedule" ? "bg-white text-[#106BDB]" : "text-white"}`}
                          style={{color: currentUrl === "/generalSchedule" ? "#106BDB" : "", backgroundColor: currentUrl === "/generalSchedule" ? "white" : "",}}
                          onClick={() => setBudgetMenuOpen(false)}>
                        <CalendarMonthIcon fontSize="small" />
                        <span className={textBaseClass}
                              style={{color: currentUrl === "/generalSchedule" ? "#106BDB" : "",}}>
                            일정
                        </span>
                    </Link>
                </div>
            </div>

            <div className="cursor-pointer px-4 py-6"
                 onClick={() => setIsSidebarFolded(!isSidebarFolded)}>
                <div className="w-8 h-8 flex justify-center items-center rounded-[50%] bg-[#569CEF]">
                    <ArrowBackIos className="text-[#DFE5EC]"
                                  fontSize="small"
                                  style={{transform: isSidebarFolded ? "rotate(180deg)" : "", marginRight: isSidebarFolded ? "7px" : "-7px",}}/>
                </div>
            </div>
        </div>
    );
}