import { useState, useEffect } from "react";
import AddSchedulePresenter from "./AddSchedulePresenter";
import dayjs from "dayjs";

export default function AddScheduleContainer({ type, isOpen, onClose, onSave, club, currentSchedule }) {
    
    if (!isOpen) return null;
    const [isRepeatEndPickerOpen, setIsRepeatEndPickerOpen] = useState(false);
    const [form, setForm] = useState({
        title: "",
        date: null,
        place: "",
        repeat: "NONE",
        repeat_end: null,
    });

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(false);

    // handleChange 수정 (DatePicker에서 오는 값은 직접 처리)
    const handleChange = (e) => {
        if (e.target) {
            // 일반 인풋/셀렉트
            setForm({ ...form, [e.target.name]: e.target.value });
        } else {
            // e가 그냥 값일 경우는 안씀, DatePicker onChange는 별도 함수로 처리함
        }
    };

    // DatePicker(시작일) 변경 처리
    const handleDateChange = (date) => {
        setForm({ ...form, date });
    };

    // 반복 종료일 DatePicker 변경 처리 추가
    const handleRepeatEndChange = (date) => {
        setForm({ ...form, repeat_end: date });
    };

    useEffect(() => {
        if (type === "edit" && currentSchedule) {
            setForm({
                title: currentSchedule.title || "",
                date: currentSchedule.date ? dayjs(currentSchedule.date) : null,
                place: currentSchedule.place || "",
                repeat: currentSchedule.repeat || null,
                repeat_end: currentSchedule.repeat_end ? dayjs(currentSchedule.repeat_end) : null,
            });
        }
    }, [type, currentSchedule]);

    const validateForm = () => {
        let newErrors = {};
        if (!form.title.trim()) newErrors.title = "제목을 입력하세요.";
        if (!form.date) newErrors.date = "일시를 선택하세요.";
        if (!form.place.trim()) newErrors.place = "장소를 입력하세요.";

        if (form.repeat && form.repeat !== "NONE" && !form.repeat_end) {
            newErrors.repeat_end = "반복 종료일을 선택하세요.";
        } else if (
            form.repeat && form.repeat !== "NONE" &&
            form.repeat_end && form.date && form.repeat_end.isBefore(form.date, "day")
        ) {
            newErrors.repeat_end = "반복 종료일은 시작일 이후여야 합니다.";
        }

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
            repeat_end: form.repeat_end ? form.repeat_end.format("YYYY-MM-DD") : null,
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
            handleRepeatEndChange={handleRepeatEndChange} // 반복 종료일 변경 함수 전달
            handleSubmit={handleSubmit}
            isDatePickerOpen={isDatePickerOpen}
            setIsDatePickerOpen={setIsDatePickerOpen}
            hasErrors={hasErrors}
            errors={errors}
            club={club}
            isRepeatEndPickerOpen={isRepeatEndPickerOpen}
            setIsRepeatEndPickerOpen={setIsRepeatEndPickerOpen}
        />
    );
}