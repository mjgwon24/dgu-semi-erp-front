import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Input, DatePicker, Select, ConfigProvider, Button } from "antd";
import locale from "antd/locale/ko_KR";

export default function AddSchedulePresenter({
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
            <DialogTitle className="flex justify-start pt-10 pl-[50px] text-black text-[23px] font-semibold">
                일정 추가
            </DialogTitle>

            <DialogContent className="p-6 flex flex-col justify-between h-full items-center">
                <div className="space-y-4 pt-3 w-full px-7">

                    {[
                        { label: "제목", name: "title", placeholder: "일정 제목 입력", value: form.title, error: errors.title },
                        { label: "동아리", name: "clubName", placeholder: "동아리 이름 입력", value: form.clubName, error: errors.clubName },
                        { label: "장소", name: "location", placeholder: "장소 입력", value: form.location, error: errors.location }
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
                            <label className="text-black text-[16px] font-medium w-[80px]">일시</label>
                            <ConfigProvider locale={locale}>
                                <DatePicker
                                    value={form.date}
                                    onChange={handleDateChange}
                                    format="YYYY-MM-DD"
                                    placeholder="일정 날짜 선택"
                                    status={errors.date ? "error" : ""}
                                    className="h-[45px] flex-1"
                                    getPopupContainer={(trigger) => trigger.parentElement}
                                    open={isDatePickerOpen}
                                    onOpenChange={(open) => setIsDatePickerOpen(open)}
                                />
                            </ConfigProvider>
                        </div>
                        {errors.date && <p className="text-red-500 text-sm mt-1 ml-[90px]">{errors.date}</p>}
                    </div>

                    <div className="flex flex-col space-y-1">
                        <div className="flex flex-row items-center space-x-2 w-full">
                            <label className="text-black text-[16px] font-medium w-[80px]">반복</label>
                            <ConfigProvider locale={locale}>
                                <Select
                                    name="repeat"
                                    value={form.repeat}
                                    onChange={(value) => handleChange({ target: { name: "repeat", value } })}
                                    className="h-[45px] flex-1"
                                    getPopupContainer={(trigger) => trigger.parentElement}
                                    options={[
                                        { value: "안함", label: "안함" },
                                        { value: "매일", label: "매일" },
                                        { value: "매주", label: "매주" },
                                        { value: "매월", label: "매월" }
                                    ]}
                                />
                            </ConfigProvider>
                        </div>
                    </div>
                </div>

                <Button
                    type="primary"
                    size="large"
                    className="w-[120px] bg-[#4368BA] text-white text-[16px] font-bold rounded-lg mb-5"
                    onClick={handleSubmit}
                >
                    추가
                </Button>
            </DialogContent>
        </Dialog>
    );
}