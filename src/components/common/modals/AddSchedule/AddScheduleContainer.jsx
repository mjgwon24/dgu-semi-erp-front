import { useState } from "react";
import AddSchedulePresenter from "./AddSchedulePresenter";
import dayjs from "dayjs";

export default function AddScheduleContainer({ isOpen, onClose, onSave, club, setSelectedDate }) {
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

    const validateForm = () => {
        let newErrors = {};
        if (!form.title.trim()) newErrors.title = "제목을 입력하세요.";
        if (!form.date) newErrors.date = "일시를 선택하세요.";
        if (!form.place.trim()) newErrors.place = "장소를 입력하세요.";

        setErrors(newErrors);
        setHasErrors(Object.keys(newErrors).length > 0);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
    
        const payload = {
            club_id: club.club_id,
            ...form,
            place: form.place,
            date: form.date ? form.date.format("YYYY-MM-DDTHH:mm") : "",
        };

        console.log(payload)
    
        try {
            const res = await fetch("http://localhost:8081/schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            if (!res.ok) throw new Error("서버 오류");
    
            const result = await res.json();
            console.log("추가 성공:", result);
    
            // 이 부분에서 전달
            onSave(form.date.toDate()); // 선택한 날짜를 부모에 전달
            setHasErrors(false);
            setSelectedDate(form.date.toDate());
        } catch (error) {
            console.error("일정 저장 실패:", error);
        }
    };

    return (
        <AddSchedulePresenter
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