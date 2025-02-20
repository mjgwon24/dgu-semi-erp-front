import Calendar from "@/src/components/common/calendar"

export default function AdminScheduleUI() {
    return (
        <div className="bg-[#F7F7F7] min-h-full flex flex-col p-[30px] gap-[20px]">
            <div className="flex flex-col gap-[20px]">
                <div className="text-[20px] font-bold">일정</div>

                <div className="flex justify-between gap-[21px]">
                    {/* 달력 레이아웃 */}
                    <div className="flex flex-col items-center gap-[30px] bg-white px-[41px] py-[32px] w-[65%] border border-[#DBDBDB] rounded-[8px]">
                        {/* 달력 헤더 */}
                        <div className="flex gap-[350px]">
                            <div className="flex items-center gap-[8px]">
                                <div className="text-[18px] w-[90px] font-semibold">2024년 {new Date().getMonth() + 1}월</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15"
                                     fill="none">
                                    <path
                                        d="M10.1111 8.25H6.5V12H10.1111V8.25ZM9.38889 0V1.5H3.61111V0H2.16667V1.5H1.44444C0.646389 1.5 0.00722222 2.17125 0.00722222 3L0 13.5C0 14.3287 0.646389 15 1.44444 15H11.5556C12.3536 15 13 14.3287 13 13.5V3C13 2.17125 12.3536 1.5 11.5556 1.5H10.8333V0H9.38889ZM11.5556 13.5H1.44444V5.25H11.5556V13.5Z"
                                        fill="black"/>
                                </svg>
                            </div>
                            <div className="flex relative">
                                <select className="appearance-none text-[14px] w-[126px] h-[29px] pl-3 border border-[#DBDBDB] rounded-[8px]">
                                    <option>DEVELOPER</option>
                                </select>
                                <div className="absolute mt-[6.4px] ml-[101px]">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* 달력 */}
                        <Calendar/>
                    </div>

                    {/* 일정 상세 레이아웃*/}
                    <div className="flex flex-col gap-[30px] bg-white px-[41px] py-[32px] w-[35%] border border-[#DBDBDB] rounded-[8px]">
                        <div className="text-[16px] font-bold">DEVELOPER</div>
                        <div className="flex flex-col gap-[16px]">
                            <div className="text-[16px] font-semibold">1월 10일</div>
                            <div className="bg-white px-[24px] py-[18px] border border-[#DBDBDB] rounded-[8px]">
                                <div className="flex justify-between ">
                                    <div>
                                        <div className="text-[16px] font-semibold">정규 회의B</div>
                                        <div className="text-[13px] text-[#A6A6A6] font-medium">비대면</div>
                                    </div>
                                    <div className="text-[16px] font-semibold">19:00</div>
                                </div>
                                <div className="flex gap-[12px] mt-[25px]">
                                    <div className="ml-auto px-[15px] py-[5px] border text-[#3C3C3C] border-[#3C3C3C] rounded-[8px] cursor-pointer">편집</div>
                                    <div className="px-[15px] py-[5px] border text-[#D11E1E] border-[#D11E1E] rounded-[8px] cursor-pointer">삭제
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white px-[24px] py-[18px] border border-[#DBDBDB] rounded-[8px]">
                                <div className="flex justify-between ">
                                    <div>
                                        <div className="text-[16px] font-semibold">정규 회의A</div>
                                        <div className="text-[13px] text-[#A6A6A6] font-medium">에너지 공학과 302 강의실</div>
                                    </div>
                                    <div className="text-[16px] font-semibold">21:00</div>
                                </div>
                                <div className="flex gap-[12px] mt-[25px]">
                                    <div className="ml-auto px-[15px] py-[5px] border text-[#3C3C3C] border-[#3C3C3C] rounded-[8px] cursor-pointer">편집</div>
                                    <div className="px-[15px] py-[5px] border text-[#D11E1E] border-[#D11E1E] rounded-[8px] cursor-pointer">삭제</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[16px]">
                            <div className="text-[16px] font-semibold">1월 17일</div>
                            <div
                                className="bg-white px-[24px] py-[18px] border border-[#DBDBDB] rounded-[8px]">
                                <div className="flex justify-between ">
                                    <div>
                                        <div className="text-[16px] font-semibold">정규 회의C</div>
                                        <div className="text-[13px] text-[#A6A6A6] font-medium">비대면</div>
                                    </div>
                                    <div className="text-[16px] font-semibold">19:00</div>
                                </div>
                                <div className="flex gap-[12px] mt-[25px]">
                                    <div className="ml-auto px-[15px] py-[5px] border text-[#3C3C3C] border-[#3C3C3C] rounded-[8px] cursor-pointer">편집</div>
                                    <div className="px-[15px] py-[5px] border text-[#D11E1E] border-[#D11E1E] rounded-[8px] cursor-pointer">삭제</div>
                                </div>
                            </div>
                        </div>
                        <div className="self-center mt-[50px]">
                            + 8개
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}