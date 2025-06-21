import Calendar from "@/src/components/common/calendar"
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale"
import { ConfigProvider, DatePicker, Button, Select } from "antd";
import { useRef } from "react";
export default function GeneralScheduleUI({
    hasPermission,
    scheduleList,
    clubList,
    groupedSchedule,
    datePickerRef,
    onSvgClick,
    datePickerOpen,
    setDatePickerOpen,
    handleDateChange,
    selectedDate,
    handleOpenModal,
    deleteSchedule,
    handleClubChange,
    currentClub,
    setSelectedDate,
    handleOpenDeleteModal
}) {

    const repeatText = {
        DAILY: "매일",
        WEEKLY: "매주",
        MONTHLY: "매월"
      };

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
                        <Button color="primary" variant="outlined"  onClick={() => handleOpenModal("create")}>일정 추가</Button>
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
                                    onOpenChange={(open) => setDatePickerOpen(open)}
                                    onPanelChange={(value) => {
                                        setSelectedDate(value.toDate());
                                    }}
                                    onChange={(value) => {
                                        if (value) {
                                        setSelectedDate(value.toDate());
                                        setDatePickerOpen(false);
                                        }
                                    }}
                                    style={{ visibility: "hidden", position: "absolute" }}
                                    />
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15"
                                     fill="none" onMouseDown={(e) => {
                                        e.preventDefault(); 
                                        onSvgClick();       
                                      }}>
                                    <path
                                        d="M10.1111 8.25H6.5V12H10.1111V8.25ZM9.38889 0V1.5H3.61111V0H2.16667V1.5H1.44444C0.646389 1.5 0.00722222 2.17125 0.00722222 3L0 13.5C0 14.3287 0.646389 15 1.44444 15H11.5556C12.3536 15 13 14.3287 13 13.5V3C13 2.17125 12.3536 1.5 11.5556 1.5H10.8333V0H9.38889ZM11.5556 13.5H1.44444V5.25H11.5556V13.5Z"
                                        fill="black"/>
                                </svg>
                            </div>
                            <div className="flex relative">
                                <Select 
                                    className=""
                                    options={clubList.map(club => ({
                                        value: club.club_id,
                                        label: club.club_name,
                                        club: club
                                      }))}
                                      value={currentClub.club_id}
                                      onChange={(value, option) => {
                                        handleClubChange(option.club);
                                      }}
                                />
                                
                            </div>
                        </div>
                        {/* 달력 */}
                        <Calendar scheduleList={scheduleList} date={selectedDate}/>
                    </div>

                    {/* 일정 상세 레이아웃*/}
                    <div className="flex flex-col gap-[30px]  bg-white px-[20px] py-[32px] w-[35%] border border-[#DBDBDB] rounded-[8px]">
                        <div className="text-xl font-bold px-3">{currentClub.club_name}</div>
                            <div className="flex flex-col gap-[30px] overflow-auto max-h-[600px] p-4">
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
                                                            <div className="text-sm text-[#A6A6A6]">
                                                                {repeatText[item.repeat] ?? ""}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {hasPermission && 
                                                    <div className="flex flex-row gap-2 justify-end">
                                                        <Button color="default" variant="outlined" onClick={() => handleOpenModal("edit", item)}>편집</Button>
                                                        <Button color="danger" variant="outlined" onClick={() => handleOpenDeleteModal(item)}>삭제</Button>
                                                    </div>
                                                }
                                                </div>
                                                
                                        
                                            ))}
                                        </div>
                                    )
                                })}

                            </div>
                    </div>
                </div>
            </div>
        </div>

        </ConfigProvider>       
    )
}

