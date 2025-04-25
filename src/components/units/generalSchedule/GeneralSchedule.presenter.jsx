import Calendar from "@/src/components/common/calendar"
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale"
import { ConfigProvider, DatePicker, Button } from "antd";
import { useRef } from "react";
export default function GeneralScheduleUI({
    hasPermission,
    scheduleList,
    groupedSchedule,
    datePickerRef,
    onSvgClick,
    datePickerOpen,
    setDatePickerOpen,
    handleDateChange,
    selectedDate,
    handleOpenModal
}) {

    return (

        <ConfigProvider
            theme={{
                components: {
                    Button : {

                    }
                },
            }}
            >


            
        <div className="bg-[#F7F7F7] h-full flex flex-col p-[30px] gap-[20px]">
            <div className="flex flex-col gap-[20px] h-full">
                <div className="flex flex-row justify-between items-center">
                    <div className="text-[20px] font-bold">일정</div>
                    {hasPermission && 
                        <Button color="primary" variant="outlined" onClick={handleOpenModal}>일정 추가</Button>
                    }
                </div>
                

                <div className="flex justify-between h-full">
                    {/* 달력 레이아웃 */}
                    <div className="flex flex-col items-center gap-[30px] bg-white px-[41px] py-[32px] w-[60%] border border-[#DBDBDB] rounded-[8px]">
                        {/* 달력 헤더 */}
                        <div className="flex justify-between w-full">
                            <div className="flex items-center gap-[8px] w-full">
                                <div className="text-[20px] font-semibold">
                                    {format(selectedDate, "yyyy년 M월")}
                                </div>
                                <DatePicker
                                    picker="month"
                                    ref={datePickerRef}
                                    open={datePickerOpen}
                                    getPopupContainer={(trigger) => trigger.parentNode}
                                    onOpenChange={(open) => {
                                        if (open) setDatePickerOpen(true);
                                    }}
                                    onChange={handleDateChange}
                                    onPanelChange={(value) => {
                                        handleDateChange(value); // 직접 처리
                                      }}
                                    style={{ visibility: "hidden", position: "absolute" }}
                                    />
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15"
                                     fill="none" onMouseDown={(e) => {
                                        e.preventDefault(); // 외부 클릭 막기
                                        onSvgClick();       // 포커스로 열기
                                      }}>
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
                        <Calendar scheduleList={scheduleList} date={selectedDate}/>
                    </div>

                    {/* 일정 상세 레이아웃*/}
                    <div className="flex flex-col gap-[30px]  bg-white px-[41px] py-[32px] w-[35%] border border-[#DBDBDB] rounded-[8px]">
                        <div className="text-[16px] font-bold">DEVELOPER</div>
                        {console.log(groupedSchedule)}
                        {Object.entries(groupedSchedule)
                            .sort(([a], [b]) => new Date(a) - new Date(b))
                            .map(([dateKey, items]) => {
                                const dateObj = new Date(dateKey)
                                const dateLabel = format(dateObj, "M월 d일", { locale: ko })

                            return (
                                <div key={dateKey} className="flex flex-col gap-[16px]">
                                    <div className="text-[16px] font-semibold">{dateLabel}</div>
                                    {items
                                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                                        .map((item) => (

                                        <div
                                            key={item.id}
                                            className="flex flex-col bg-white px-[24px] py-[18px] border border-[#DBDBDB] rounded-[8px] gap-4">
                                            <div className="flex flex-row justify-between">
                                                <div>
                                                    <div className="text-xl font-[600]">{item.title}</div>
                                                    <div className="text-sm text-[#A6A6A6] font-[500]">{item.place}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xl  font-[600]">
                                                        {format(parseISO(item.date), "HH:mm")}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {hasPermission && 
                                            <div className="flex flex-row gap-2 justify-end">
                                                <Button color="default" variant="outlined">편집</Button>
                                                <Button color="danger" variant="outlined">삭제</Button>
                                            </div>
                                        }
                                        </div>
                                        
                                 
                                    ))}
                                </div>
                            )
                        })}

                        {/* 필요하다면 아래에 +N개 표시 */}
                        <div className="self-center mt-[50px]">
                            + {scheduleList.length}개
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </ConfigProvider>       
    )
}