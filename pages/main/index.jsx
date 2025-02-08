import Main from "@/src/components/units/main/Main.container";
import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";

import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function MainPage() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    location: '',
    repeat: ''
  });

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = endOfMonth.date();
  const startDay = startOfMonth.day();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  
  const openModal = (date) => {
    setSelectedDate(currentDate);
  };

  const closeModal = () => {
    setSelectedDate(null);
  };

  const addEvent = (newEvent) => {
    const dateKey = selectedDate;
    if (events[dateKey]) {

    }
    closeModal();
  };

  var events = {
    '2025-02-05': [
      {title: '정규 회의', time: "19:00", location: "에너지공학과 302강의실", repeat: "매주"}, 
      {title: '스택네컷 팀 주간 회의', time: "21:00", location: '비대면', repeat: null}
      ],
    '2025-02-12': [
      {title: '정규 회의', time: "19:00", location: "에너지공학과 302강의실", repeat: "매주"}, 
      {title: '스택네컷 팀 주간 회의', time: "21:00", location: '비대면', repeat: null}
      ],
    '2025-03-05': [
      {title: '3월 회의', time: "19:00", location: "에너지공학과 302강의실", repeat: "매주"}
      ]
  };
    return (
        <div className="flex h-screen"> {/* 최상단 레이아웃 */}
            <div className="w-[12%]">
                <SideBarLayout/>
            </div>
            <div className="flex-grow flex-col border-l-[1px] border-solid border-black bg-[#F7F7F7]">
              <div className="flex h-[10%]"> {/* HeaderLayout의 비율을 조정 */}
                  <HeaderLayout/>
            </div>
            <div className="flex flex-col gap-4 w-full"> {/* HeaderLayout 나머지 비율을 조정 */}
                <div className="text-2xl font-bold px-8">일정</div>
                
                <div className="flex flex-row gap-8 p-4">
                  <div className="flex flex-col w-full bg-white rounded-lg p-4 border border-[#DBDBDB] gap-1" >
                    <div className="flex justify-between items-center pb-4">
                      <button onClick={prevMonth} className="px-2 py-1 bg-gray-200 rounded">◀</button>
                      <h2 className="text-lg font-semibold">{currentDate.format("YYYY년 MM월")}</h2>
                      <button onClick={nextMonth} className="px-2 py-1 bg-gray-200 rounded">▶</button>
                    </div>
                    <div className="grid grid-cols-7 text-center font-medium">
                      {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                        <div key={day} className="p-2 text-gray-700">{day}</div>
                      ))}
                    </div>
                    <hr></hr>
                    <div className="grid grid-cols-7 gap-1 " style={{ gridAutoRows: '100px' }}>
                      {[...Array(startDay)].map((_, index) => (
                        <div key={"empty-" + index} className="p-2"></div>
                      ))}
                      {[...Array(daysInMonth)].map((_, index) => {
                        const day = index + 1;
                        const dateKey = currentDate.format(`YYYY-MM-${String(day).padStart(2, "0")}`);
                        return (
                          
                          <div
                            key={index}
                            className="p-2 rounded hover:bg-gray-100 cursor-pointer relative"
                            onClick={() => openModal(day)}
                          >
                            <div className="text-right text-[#868686]">{day}</div>

                            {/* 일정 출력 */}
                            {events[dateKey] && (
                              <div className="flex flex-col items-center space-y-1">
                                {events[dateKey].map((event, eventIndex) => (
                                  <div
                                    key={eventIndex}
                                    className="w-full text-xs text-left text-[#616161] truncate bg-[#EFEFEF] rounded p-1"
                                    style={{ maxWidth: '130px' }}
                                  >
                                    {event['title']}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* 일정 추가 모달 */}
                    {selectedDate && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
                        <div className="flex flex-col gap-4 bg-white px-16 py-10 shadow-lg" onClick={(e) => e.stopPropagation()}>
                          <h2 className="text-xl font-semibold text-left">일정 추가</h2>
                          <p className="text-lg">{selectedDate.format(`YYYY년 MM월 DD일`)}</p>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                              <label className="w-20 text-left font-semibold">제목</label>
                              <input className="border border-gray-400 rounded w-full h-8" value={newEvent.title}/>
                            </div>
                            <div className="flex items-center gap-2">
                            <label className="w-20 text-left font-semibold">동아리</label>
                            <select className="border border-gray-400 rounded w-full h-8">
                                <option value="">DEVELOPER</option>
                                <option value="">DEVELOPER</option>
                                <option value="">DEVELOPER</option>
                                <option value="">DEVELOPER</option>
                              </select>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="w-20 text-left font-semibold">일시</label>
                              <input className="border border-gray-400 rounded w-full h-8" value={newEvent.time}/>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="w-20 text-left font-semibold">장소</label>
                              <input className="border border-gray-400 rounded w-full h-8" value={newEvent.location}/>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="w-20 text-left font-semibold">반복</label>
                              <select className="border border-gray-400 rounded w-full h-8" value={newEvent.repeat}>
                                <option value="">안함</option>
                                <option value="">매일</option>
                                <option value="">매주</option>
                                <option value="">매월</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-center p-6">
                            <button
                                onClick={() => addEvent(newEvent)}
                                className="px-10 py-2 bg-[#4368BA] text-white rounded-lg  hover:bg-[#304c8a] transition"
                              >
                              추가
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col w-[40%] bg-white rounded-lg border border-[#DBDBDB] p-4">
                    <div>
                      <h1 className="text-lg font-semibold py-4">DEVELOPER</h1>
                      {Object.entries(events).map(([date, eventList]) => {
                        if (date.startsWith(currentDate.format('YYYY-MM'))) {
                          const formattedDate = dayjs(date).format('M월 D일');
                          return (
                            <div key={date} className="flex flex-col gap-4 p-4">
                              <p className="text-xl font-bold">{formattedDate}</p>

                                {eventList.map((event, index) => (
                                  <div key={index} className="flex flex-col border border-[#DBDBDB] rounded-lg">
                                    <div className="p-4">
                                      <div className="flex justify-between">
                                        <label className="text-[#303030] text-xl">{event.title}</label>
                                        <label className="text-[#303030] text-xl">{event.time}</label>
                                      </div>
                                      <div className="flex justify-between">
                                        <label className="text-[#A6A6A6]">{event.location}</label>
                                        <label className="text-[#A6A6A6]">{event.repeat}</label>
                                      </div>
                                    </div>
                                    
                                    
                                  </div>
                                ))}
                              
                            </div>
                          );
                        }
                      })}
                      
                      {/* {[...Array(events)].map_((_, index) => {console.log(_)})} */}
                    </div>
                    
                  </div>
                </div>
                
                
                </div>
            </div>
        </div>
    )
}