
export default function Calendar({ scheduleList = [], date}) {
    const today = new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // 0부터 시작하는 월 (0 = 1월)

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 현재 월의 마지막 날짜
    const startDay = new Date(year, month, 1).getDay(); // 현재 월 1일의 요일
    const weeks = [];

    let week = Array(startDay).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);

        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }

    if (week.length > 0) {
        weeks.push(week);
    }

    return (
        <div className="w-full h-full">
            {/* 요일 헤더 */}
            <div className="flex">
                {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                    <div
                        key={index}
                        className="text-center pb-2 text-[#717171] border-b border-[#D4D4D4] basis-[14.285%]"
                    >
                        {day}
                    </div>
                ))}
            </div>
    
            {/* 날짜 렌더링 */}
            {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex border-b border-[#D4D4D4] h-1/6">
                    {week.map((day, dayIndex) => {
                        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                        const schedules = day
                            ? scheduleList.filter(schedule => {
                                const scheduleDate = new Date(schedule.date);
                                return scheduleDate.getDate() === day;
                            })
                            : [];

                        return (
                            <div
                                key={dayIndex}
                                className={`h-full pt-1 text-center text-[#717171] basis-[14.285%] ${isToday ? 'text-blue-500' : 'text-[#717171]'}`}
                            >
                                <div className="flex flex-col items-center justify-start h-full px-1 gap-1">
                                    {/* 날짜 */}
                                    <div className="text-sm font-semibold self-end h-1/4 ">
                                        {day !== null ? day : ''}
                                    </div>

                                    {/* 일정 목록 */}
                                    {day !== null && (
                                    <>
                                        {schedules.slice(0, 2).map((schedule, idx) => (
                                        <div
                                            key={idx}
                                            className="text-xs bg-[#EFEFEF] text-[#616161] w-full rounded-lg truncate border h-1/5"
                                        >
                                            {schedule.title}
                                        </div>
                                        ))}

                                        {schedules.length > 2 && (
                                        <div className="text-xs  text-[#616161] w-full rounded-lg truncate h-1/5">
                                            +{schedules.length - 2}개
                                        </div>
                                        )}
                                    </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
