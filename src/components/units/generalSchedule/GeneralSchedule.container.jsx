import GeneralScheduleUI from "@/src/components/units/generalSchedule/GeneralSchedule.presenter";
import AddScheduleContainer from "../../common/modals/AddSchedule/AddScheduleContainer";
import koLocale from "date-fns/locale/ko";
import { format, parseISO } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import axios from "axios";

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
    const [currentSchedule, setCurrentSchedule] = useState(null);
    const [currentClub, setCurrentClub] = useState(clubList[0]);
    const [modalType, setModalType] = useState(null);

    const handleOpenModal = (type, schedule = null) => {
        setModalType(type);
        setCurrentSchedule(schedule);
        console.log(currentSchedule);
        setOpenModal(true);
    };

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
        onError: (err) => {
            console.error("일정 삭제 실패:", err);
            toast.error("삭제에 실패했습니다.");
        },
    });

    const handleSaveSchedule = (payload) => {
        saveSchedule(payload);
    };

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
        </>
    )
}
