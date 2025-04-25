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

    const club = {
        club_id : 1,
        club_name : "DEVELOPER"
    }

    const permission = true;

    const datePickerRef = useRef(null);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleDateChange = (date) => {
        setSelectedDate(date.toDate());
        setDatePickerOpen(false);
    };

    const onSvgClick = () => {
        setDatePickerOpen(true);
    };

    const clubId = 1;

    const fetchScheduleList = async (clubId) => {
        const res = await axios.get(`http://localhost:8081/schedule?club_id=${clubId}&year=${selectedDate.getFullYear()}&month=${selectedDate.getMonth() + 1}`);
        return res.data.scheduleList;
    };

    const queryClient = useQueryClient();

    const { data: scheduleList = [], isLoading, isError } = useQuery({
        queryKey: ["scheduleList", clubId, selectedDate.getFullYear(), selectedDate.getMonth()],
        queryFn: () => fetchScheduleList(clubId, selectedDate),
        keepPreviousData: true,
    });

    const { mutate: addSchedule } = useMutation({
        mutationFn: async (newSchedule) => {
            const res = await axios.post("http://localhost:8081/schedule", newSchedule);
            return res.data;
        },
        onSuccess: () => {
            // 성공 시 캐시 무효화하여 scheduleList 재요청
            queryClient.invalidateQueries(["scheduleList", clubId, selectedDate.getFullYear(), selectedDate.getMonth()]);
            handleCloseModal();
        },
        onError: (err) => {
            console.error("일정 추가 실패:", err);
        }
    });

    const handleSaveSchedule = (form) => {
        const payload = {
            club_id: club.club_id,
            title: form.title,
            place: form.location,
            repeat: form.repeat,
            date: form.date ? form.date.format("YYYY-MM-DDTHH:mm") : "",
        };
        addSchedule(payload);
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
            handleOpenModal={handleOpenModal}
        />
        <AddScheduleContainer
            isOpen={openModal}
            onClose={handleCloseModal}
            onSave={handleSaveSchedule}
            club={club}
            setSelectedDate={setSelectedDate}
        />
        </>
    )
}
