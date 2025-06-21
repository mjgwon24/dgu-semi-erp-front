import GeneralScheduleUI from "@/src/components/units/generalSchedule/GeneralSchedule.presenter";
import AddScheduleContainer from "../../common/modals/AddSchedule/AddScheduleContainer";
import DeleteScheduleContainer from "../../common/modals/DeleteSchedule/DeleteScheduleContainer";
import koLocale from "date-fns/locale/ko";
import { parseISO, eachDayOfInterval, isSameDay, isSameWeek, isSameMonth, startOfMonth, endOfMonth, isBefore, eachMonthOfInterval, format, addMonths } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import axios from "axios";
import {  } from "date-fns";
export default function GeneralSchedule() {
    const user = {
        permission : "ADMIN"
    }

    const clubList = [
        { 
            club_id : 1,
            club_name : "DEVELOPER"
        },
        { 
            club_id : 2,
            club_name : "머시기동아리"
        }
    ]

    const permission = true;

    const datePickerRef = useRef(null);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [currentSchedule, setCurrentSchedule] = useState(null);
    const [currentClub, setCurrentClub] = useState(clubList[0]);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [scheduleToDelete, setScheduleToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null);

    const handleOpenModal = (type, schedule = null) => {
        setModalType(type);
        setCurrentSchedule(schedule);
        console.log(currentSchedule);
        setOpenModal(true);
    };

    const handleOpenDeleteModal = (schedule) => {
        console.log(schedule.repeat);
        console.log(schedule.id);
        if (schedule.repeat != null){
            setDeleteType("repeat");
        }
        else {
            setDeleteType("normal");
        }
        setScheduleToDelete(schedule);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setDeleteType(null);
    }

    const handleCloseModal = () => {
        setModalType(null);
        setOpenModal(false);
      };

    const handleDateChange = (date) => {
        setSelectedDate(date.toDate());
        setDatePickerOpen(false);
    };

    const handleClubChange = (club) => {
        setCurrentClub(club);
    }

    const onSvgClick = () => {
        setDatePickerOpen(true);
    };


    const fetchScheduleList = async (clubId) => {
        const res = await axios.get(`http://localhost:8081/schedule?club_id=${clubId}&year=${selectedDate.getFullYear()}&month=${selectedDate.getMonth() + 1}`);
        return res.data.scheduleList;
    };

    const queryClient = useQueryClient();

    const { data: scheduleList = [], isLoading, isError } = useQuery({
        queryKey: ["scheduleList", currentClub?.club_id, selectedDate.getFullYear(), selectedDate.getMonth()],
        queryFn: () => fetchScheduleList(currentClub?.club_id, selectedDate),
        keepPreviousData: true,
    });

    const { mutate: saveSchedule } = useMutation({
        mutationFn: async (scheduleData) => {
            if (modalType === "edit") {
                // 수정일 경우 (PATCH 요청)
                const res = await axios.put(`http://localhost:8081/schedule/${currentSchedule.id}`, scheduleData);
                return res.data;
            } else {
                // 추가일 경우 (POST 요청)
                const res = await axios.post("http://localhost:8081/schedule", scheduleData);
                return res.data;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["scheduleList", currentClub?.club_id, selectedDate.getFullYear(), selectedDate.getMonth()]);
            handleCloseModal();
        },
        onError: (err) => {
            console.error("일정 저장 실패:", err);
        }
    });

    const { mutate: deleteSchedule } = useMutation({
        mutationFn: async (scheduleId) => {
            await axios.delete(`http://localhost:8081/schedule/${scheduleId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["scheduleList", currentClub?.club_id, selectedDate.getFullYear(), selectedDate.getMonth()]);
            toast.success("일정이 삭제되었습니다.");
        },
        onError: (err, scheduleId) => {
            console.error("일정 삭제 실패:", err);
            console.log(scheduleId);
            toast.error("삭제에 실패했습니다.");
        },
    });

    const handleExcludeDate = async () => {
        try {
            const excluded_date = scheduleToDelete.date; // format: "yyyy-MM-dd"
            await axios.post(
                `http://localhost:8081/schedule/${scheduleToDelete.id}/exclude`,
                { excluded_date }
            );
            queryClient.invalidateQueries(["scheduleList"]);
            handleCloseDeleteModal();
        } catch (err) {
            console.error("반복 일정 한 건 삭제 실패:", err);
        }
    };

    const handleSaveSchedule = (payload) => {
        saveSchedule(payload);
    };

//     function expandRepeatedSchedules(scheduleList, selectedDate) {
//     const expanded = [];

//     const monthStart = startOfMonth(selectedDate);
//     const monthEnd = endOfMonth(selectedDate);
//     const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

//     scheduleList.forEach(schedule => {
//         const originDate = parseISO(schedule.date);
//         const repeat = schedule.repeat;
//         const repeatEnd = schedule.repeat_end ? parseISO(schedule.repeat_end) : null;

//         const isWithinRepeat = (day) => {
//             return !isBefore(day, originDate) && (!repeatEnd || !isAfter(day, repeatEnd));
//         };

//         if (!repeat || repeat === "NONE") {
//             if (
//                 originDate.getFullYear() === selectedDate.getFullYear() &&
//                 originDate.getMonth() === selectedDate.getMonth()
//             ) {
//                 expanded.push(schedule);
//             }
//             return;
//         }

//         daysInMonth.forEach(day => {
//             if (!isWithinRepeat(day)) return;

//             if (repeat === "DAILY") {
//                 expanded.push({ ...schedule, date: format(day, "yyyy-MM-dd") });

//             } else if (repeat === "WEEKLY") {
//                 if (day.getDay() === originDate.getDay()) {
//                     expanded.push({ ...schedule, date: format(day, "yyyy-MM-dd") });
//                 }

//             } else if (repeat === "MONTHLY") {
//                 // 각 달의 원래 날짜와 일치하는 날에만 생성
//                 if (day.getDate() === originDate.getDate()) {
//                     expanded.push({ ...schedule, date: format(day, "yyyy-MM-dd") });
//                 }
//             }
//         });
//     });

//     return expanded;
// }

    function groupByDate(scheduleList) {
        const grouped = {};
        scheduleList.forEach((schedule) => {
            const dateObj = parseISO(schedule.date);
            const dateKey = format(dateObj, "yyyy-MM-dd");
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(schedule);
        });
        return grouped;
    }

    //const expandedScheduleList = expandRepeatedSchedules(scheduleList, selectedDate);
    const groupedSchedule = groupByDate(scheduleList);

    return (
        <>
        <GeneralScheduleUI 
            user={user} 
            hasPermission={permission}
            scheduleList={scheduleList} 
            groupedSchedule={groupedSchedule}
            datePickerRef={datePickerRef}
            onSvgClick={onSvgClick}
            datePickerOpen={datePickerOpen}
            setDatePickerOpen={setDatePickerOpen}
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleOpenModal={handleOpenModal}
            deleteSchedule={deleteSchedule}
            clubList={clubList}
            handleClubChange={handleClubChange}
            currentClub={currentClub}
            handleOpenDeleteModal={handleOpenDeleteModal}
        />
        <AddScheduleContainer
            type={modalType}
            currentSchedule={currentSchedule}
            isOpen={openModal}
            onClose={handleCloseModal}
            onSave={handleSaveSchedule}
            club={currentClub}
            setSelectedDate={setSelectedDate}
        />
        <DeleteScheduleContainer
            isOpen={openDeleteModal}
            onClose={handleCloseDeleteModal}
            deleteType={deleteType}
            deleteSchedule={deleteSchedule}
            scheduleToDelete={scheduleToDelete}
            handleExcludeDate={handleExcludeDate}
        />
        </>
    )
}
