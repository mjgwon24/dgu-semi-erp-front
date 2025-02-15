import { useState } from "react";
import AddSchedulePresenter from "./AddSchedulePresenter";
import dayjs from "dayjs";

export default function AddScheduleContainer({ isOpen, onClose, onSave }) {
    const [form, setForm] = useState({
        title: "",
        clubName: "",
        date: null,
        location: "",
        repeat: "안함",
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
        if (!form.clubName.trim()) newErrors.clubName = "동아리를 입력하세요.";
        if (!form.date) newErrors.date = "일시를 선택하세요.";
        if (!form.location.trim()) newErrors.location = "장소를 입력하세요.";

        setErrors(newErrors);
        setHasErrors(Object.keys(newErrors).length > 0);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        onSave({ ...form, date: form.date ? form.date.format("YYYY-MM-DD") : "" });
        onClose();
        setHasErrors(false);
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
        />
    );
}