import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { DatePicker, Select, ConfigProvider } from "antd";
import locale from "antd/locale/ko_KR";

export default function AddSchedulePresenter({
    modalType,
    isOpen,
    onClose,
    form,
    handleChange,
    handleDateChange,
    handleSubmit,
    isDatePickerOpen,
    setIsDatePickerOpen,
    hasErrors,
    errors,
    club,
    isRepeatEndPickerOpen,
    setIsRepeatEndPickerOpen,
}) {
    // 반복이 선택된 경우에만 종료일 DatePicker 노출
    const showRepeatEndPicker = form.repeat && form.repeat !== "NONE";

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slotProps={{
                paper: { style: { width: "450px", height: "auto", overflow: "visible" } }
            }}
        >
            <DialogTitle className="flex justify-start pt-10 pl-[50px] text-black text-[23px] font-semibold">
                {modalType === "create" ? "일정 추가" : "일정 편집"}
            </DialogTitle>

            <DialogContent className="p-6 flex flex-col justify-between h-full items-center">
                <div className="space-y-4 pt-3 w-full px-7">

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">제목</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className={`w-full border border-gray-300 rounded px-4 py-2 text-[16px] ${errors.title ? "border-red-500" : ""}`}
                            placeholder="일정 제목 입력"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">동아리</label>
                        <label className="text-gray-600 text-[18px] font-[500]">{club.club_name}</label>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">일시</label>
                        <ConfigProvider locale={locale}>
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm"
                                value={form.date}
                                onChange={handleDateChange}
                                className={`w-full border border-gray-300 rounded px-4 py-2 text-[16px] ${errors.date ? "border-red-500" : ""}`}
                                getPopupContainer={(trigger) => trigger.parentElement}
                                open={isDatePickerOpen}
                                onOpenChange={(open) => setIsDatePickerOpen(open)}
                            />
                        </ConfigProvider>
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">장소</label>
                        <input
                            type="text"
                            name="place"
                            value={form.place}
                            onChange={handleChange}
                            className={`w-full border border-gray-300 rounded px-4 py-2 text-[16px] ${errors.place ? "border-red-500" : ""}`}
                            placeholder="장소 입력"
                        />
                        {errors.place && <p className="text-red-500 text-sm">{errors.place}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">반복</label>
                        <ConfigProvider locale={locale}>
                            <Select
                                name="repeat"
                                value={form.repeat}
                                onChange={(value) => handleChange({ target: { name: "repeat", value } })}
                                className="w-full"
                                getPopupContainer={(trigger) => trigger.parentElement}
                                popupClassName="custom-dropdown"
                                style={{
                                    border: "none",
                                    borderRadius: "6px",
                                    backgroundColor: "white",
                                    transition: "border-color 0.2s ease-in-out",
                                    height: "45px",
                                }}
                                dropdownStyle={{
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                    borderRadius: "6px",
                                    border: "1px solid #d1d5db",
                                }}
                                options={[
                                    { value: "NONE", label: <div style={{ height: "45px", display: "flex", alignItems: "center" }}>안함</div> },
                                    { value: "DAILY", label: <div style={{ height: "45px", display: "flex", alignItems: "center" }}>매일</div> },
                                    { value: "WEEKLY", label: <div style={{ height: "45px", display: "flex", alignItems: "center" }}>매주</div> },
                                    { value: "MONTHLY", label: <div style={{ height: "45px", display: "flex", alignItems: "center" }}>매월</div> },
                                ]}
                            />
                        </ConfigProvider>
                        {errors.repeat && <p className="text-red-500 text-sm">{errors.repeat}</p>}
                    </div>

                    {/* 반복 종료일 DatePicker - 반복이 선택된 경우에만 노출 */}
                    {showRepeatEndPicker && (
                        <div className="flex flex-col mt-4">
                            <label className="text-black text-[16px] font-medium">반복 종료일</label>
                            <ConfigProvider locale={locale}>
                                <DatePicker
                                    value={form.repeat_end}
                                    onChange={(date) => handleChange({ target: { name: "repeat_end", value: date } })}
                                    className={`w-full border border-gray-300 rounded px-4 py-2 text-[16px] ${errors.repeat_end ? "border-red-500" : ""}`}
                                    getPopupContainer={(trigger) => trigger.parentElement}
                                    open={isRepeatEndPickerOpen}
                                    onOpenChange={(open) => setIsRepeatEndPickerOpen(open)}
                                />
                            </ConfigProvider>
                            {errors.repeat_end && <p className="text-red-500 text-sm">{errors.repeat_end}</p>}
                        </div>
                    )}

                </div>

                <button
                    onClick={handleSubmit}
                    className="w-[120px] h-[40px] bg-[#4368BA] text-white text-[16px] font-bold rounded-lg hover:bg-blue-700 mt-4"
                >
                    {modalType === "create" ? "추가" : "편집"}
                </button>
            </DialogContent>
        </Dialog>
    );
}