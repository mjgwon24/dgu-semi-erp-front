import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { DatePicker, Select, ConfigProvider } from "antd";
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
    const dialogHeight = hasErrors || isDatePickerOpen ? "800px" : "600px";

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slotProps={{
                paper: { style: { width: "450px", height: dialogHeight, overflow: "visible" } }
            }}
        >
            <DialogTitle className="flex justify-start pt-10 pl-[50px] text-black text-[23px] font-semibold">
                일정 추가
            </DialogTitle>

            <DialogContent className="p-6 flex flex-col justify-between h-full items-center">
                <div className="space-y-4 pt-3 w-full px-7">

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">제목</label>
                        <input type="text" name="title" value={form.title} onChange={handleChange}
                               className={`w-full border border-gray-300 rounded px-4 py-2 text-[16px] ${errors.title ? "border-red-500" : ""}`}
                               placeholder="일정 제목 입력"/>
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">동아리</label>
                        <input type="text" name="clubName" value={form.clubName} onChange={handleChange}
                               className={`w-full border border-gray-300 rounded px-4 py-2 text-[16px] ${errors.clubName ? "border-red-500" : ""}`}
                               placeholder="동아리 이름 입력"/>
                        {errors.clubName && <p className="text-red-500 text-sm">{errors.clubName}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">일시</label>
                        <ConfigProvider locale={locale}>
                            <DatePicker
                                value={form.date}
                                onChange={handleDateChange}
                                format="YYYY-MM-DD"
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
                        <input type="text" name="location" value={form.location} onChange={handleChange}
                               className={`w-full border border-gray-300 rounded px-4 py-2 text-[16px] ${errors.location ? "border-red-500" : ""}`}
                               placeholder="장소 입력"/>
                        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
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
                                    { value: "안함", label: <div style={{ height: "45px", display: "flex", alignItems: "center" }}>안함</div> },
                                    { value: "매일", label: <div style={{ height: "45px", display: "flex", alignItems: "center" }}>매일</div> },
                                    { value: "매주", label: <div style={{ height: "45px", display: "flex", alignItems: "center" }}>매주</div> },
                                    { value: "매월", label: <div style={{ height: "45px", display: "flex", alignItems: "center" }}>매월</div> },
                                ]}
                            />
                        </ConfigProvider>
                        {errors.repeat && <p className="text-red-500 text-sm">{errors.repeat}</p>}
                    </div>
                </div>

                <button onClick={handleSubmit}
                        className="w-[120px] h-[40px] bg-[#4368BA] text-white text-[16px] font-bold rounded-lg hover:bg-blue-700 mt-4">
                    추가
                </button>
            </DialogContent>
        </Dialog>
    );
}