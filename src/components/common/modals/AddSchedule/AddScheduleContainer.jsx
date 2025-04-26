import { useState, useEffect } from "react";
import AddSchedulePresenter from "./AddSchedulePresenter";
import dayjs from "dayjs";

export default function AddScheduleContainer({ type, isOpen, onClose, onSave, club, currentSchedule }) {
    if (!isOpen) return null;

    const [form, setForm] = useState({
        title: "",
        date: null,
        place: "",
        repeat: null,
    });

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setForm({ ...form, date });
    };

    console.log(currentSchedule);

    useEffect(() => {
        if (type === "edit" && currentSchedule) {
            setForm({
                title: currentSchedule.title || "",
                date: currentSchedule.date ? dayjs(currentSchedule.date) : null,
                place: currentSchedule.place || "",
                repeat: currentSchedule.repeat || null,
            });
        }
    }, [type, currentSchedule]);

    const validateForm = () => {
        let newErrors = {};
        if (!form.title.trim()) newErrors.title = "제목을 입력하세요.";
        if (!form.date) newErrors.date = "일시를 선택하세요.";
        if (!form.place.trim()) newErrors.place = "장소를 입력하세요.";

        setErrors(newErrors);
        setHasErrors(Object.keys(newErrors).length > 0);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
    
        const payload = {
            club_id: club.club_id,
            ...form,
            place: form.place,
            date: form.date ? form.date.format("YYYY-MM-DDTHH:mm") : "",
        };
    
        onSave(payload); // 서버 요청은 부모가 담당
    };

    return (
        <AddSchedulePresenter
            modalType={type}
            isOpen={isOpen}
            onClose={onClose}
            form={form}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleSubmit={handleSubmit}
            isDatePickerOpen={isDatePickerOpen}
            setIsDatePickerOpen={setIsDatePickerOpen}
            hasErrors={hasErrors}
            errors={errors}
            club={club}
        />
    );
}