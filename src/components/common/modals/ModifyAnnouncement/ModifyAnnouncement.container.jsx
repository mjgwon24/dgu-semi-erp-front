import { useState } from "react";
import ModifyAnnouncementPresenter from "./ModifyAnnouncement.presenter.jsx";
import dayjs from "dayjs";

export default function ModifyAnnouncementContainer({ isOpen, onClose, onSave }) {

    if (!isOpen) return (<></>);
    const [form, setForm] = useState({
        title: "",
        content: "",
    });

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(false);

    const handleChangeTitle = (e) => {
        setForm({ title : e.target.value });
    };

    const handleContentChange = (e) => {
        setForm({ ...form, content: e.target.value});
    };

    const validateForm = () => {
        let newErrors = {};
        if (!form.title.trim()) newErrors.title = "제목을 입력하세요.";
        if (!form.content.trim()) newErrors.location = "장소를 입력하세요.";

        setErrors(newErrors);
        setHasErrors(Object.keys(newErrors).length > 0);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm())
            return;
        // submit this
        onClose();
        setHasErrors(false);
    };
    return (
        <ModifyAnnouncementPresenter
            isOpen={isOpen}
            onClose={onClose}
            form={form}
            handleChangeTitle={handleChangeTitle}
            handleContentChange={handleContentChange}
            handleSubmit={handleSubmit}
        />
    );
}