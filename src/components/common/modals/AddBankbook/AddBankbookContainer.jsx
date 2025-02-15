import { useState } from "react";
import AddBankbookPresenter from "./AddBankbookPresenter";
import dayjs from "dayjs";

export default function AddBankbookContainer({ isOpen, onClose, onSave }) {
    const [form, setForm] = useState({
        clubName: "",
        bankName: "",
        accountNumber: "",
        openDate: null,
        owner: "",
    });

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setForm({ ...form, openDate: date });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!form.clubName.trim()) newErrors.clubName = "동아리를 입력하세요.";
        if (!form.bankName.trim()) newErrors.bankName = "은행을 입력하세요.";
        if (!form.accountNumber.trim()) newErrors.accountNumber = "계좌번호를 입력하세요.";
        if (!form.openDate) newErrors.openDate = "개설일을 선택하세요.";
        if (!form.owner.trim()) newErrors.owner = "소유주를 입력하세요.";

        setErrors(newErrors);
        setHasErrors(Object.keys(newErrors).length > 0);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        onSave({ ...form, openDate: form.openDate ? form.openDate.format("YYYY-MM-DD") : "" });
        onClose();
        setHasErrors(false);
    };

    return (
        <AddBankbookPresenter
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