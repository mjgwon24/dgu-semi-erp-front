import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Input, DatePicker, ConfigProvider, Button } from "antd";
import locale from "antd/locale/ko_KR";

export default function AddBankbookPresenter({
                                                 isOpen,
                                                 onClose,
                                                 form,
                                                 handleChange,
                                                 handleDateChange,
                                                 handleSubmit,
                                                 isDatePickerOpen,
                                                 setIsDatePickerOpen,
                                                 hasErrors,
                                                 errors
                                             }) {
    const dialogHeight = isDatePickerOpen ? "850px" : hasErrors ? "650px" : "580px";

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slotProps={{
                paper: { style: { width: "480px", height: dialogHeight } }
            }}
        >
            <DialogTitle className="flex justify-start pl-[50px] pt-10 text-black text-[23px] font-semibold">
                통장 추가
            </DialogTitle>

            <DialogContent className="p-6 flex flex-col justify-between h-full items-center">
                <div className="space-y-4 pt-3 w-full px-7">

                    {[
                        { label: "동아리", name: "clubName", placeholder: "동아리 입력", value: form.clubName, error: errors.clubName },
                        { label: "은행", name: "bankName", placeholder: "은행 입력", value: form.bankName, error: errors.bankName },
                        { label: "계좌번호", name: "accountNumber", placeholder: "계좌번호 입력", value: form.accountNumber, error: errors.accountNumber },
                        { label: "소유주", name: "owner", placeholder: "소유주 입력", value: form.owner, error: errors.owner }
                    ].map((field, index) => (
                        <div key={index} className="flex flex-col space-y-1">
                            <div className="flex flex-row items-center space-x-2 w-full">
                                <label className="text-black text-[16px] font-medium w-[80px]">{field.label}</label>
                                <Input
                                    name={field.name}
                                    value={field.value}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    status={field.error ? "error" : ""}
                                    className="h-[45px] text-[16px] flex-1"
                                />
                            </div>
                            {field.error && <p className="text-red-500 text-sm mt-1 ml-[90px]">{field.error}</p>}
                        </div>
                    ))}

                    <div className="flex flex-col space-y-1">
                        <div className="flex flex-row items-center space-x-2 w-full">
                            <label className="text-black text-[16px] font-medium w-[80px]">개설일</label>
                            <ConfigProvider locale={locale}>
                                <DatePicker
                                    value={form.openDate}
                                    onChange={handleDateChange}
                                    format="YYYY-MM-DD"
                                    placeholder="개설일 선택"
                                    status={errors.openDate ? "error" : ""}
                                    className="h-[45px] flex-1"
                                    getPopupContainer={(trigger) => trigger.parentElement}
                                    open={isDatePickerOpen}
                                    onOpenChange={(open) => setIsDatePickerOpen(open)}
                                />
                            </ConfigProvider>
                        </div>
                        {errors.openDate && <p className="text-red-500 text-sm mt-1 ml-[90px]">{errors.openDate}</p>}
                    </div>

                </div>

                <Button
                    type="primary"
                    size="large"
                    className="w-[120px] bg-[#4368BA] text-white text-[16px] font-bold rounded-lg mb-6"
                    onClick={handleSubmit}
                >
                    추가
                </Button>
            </DialogContent>
        </Dialog>
    );
}