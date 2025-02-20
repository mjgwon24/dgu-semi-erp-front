import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { DatePicker, ConfigProvider } from "antd";
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
    const dialogHeight = hasErrors || isDatePickerOpen ? "800px" : "650px";

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slotProps={{
                paper: { style: { width: "450px", height: dialogHeight } }
            }}
        >
            <DialogTitle className="flex justify-start pl-[50px] pt-10 text-black text-[23px] font-semibold">
                통장 추가
            </DialogTitle>

            <DialogContent className="p-6 flex flex-col justify-between h-full items-center">
                <div className="space-y-4 pt-3 w-full px-7">

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">동아리</label>
                        <input type="text" name="clubName" value={form.clubName} onChange={handleChange}
                               className={`w-full border rounded px-4 py-2 text-[16px] ${errors.clubName ? "border-red-500" : ""}`}
                               placeholder="동아리 입력"/>
                        {errors.clubName && <p className="text-red-500 text-sm">{errors.clubName}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">은행</label>
                        <input type="text" name="bankName" value={form.bankName} onChange={handleChange}
                               className={`w-full border rounded px-4 py-2 text-[16px] ${errors.bankName ? "border-red-500" : ""}`}
                               placeholder="은행 입력"/>
                        {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">계좌번호</label>
                        <input type="text" name="accountNumber" value={form.accountNumber} onChange={handleChange}
                               className={`w-full border rounded px-4 py-2 text-[16px] ${errors.accountNumber ? "border-red-500" : ""}`}
                               placeholder="계좌번호 입력"/>
                        {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">개설일</label>
                        <ConfigProvider locale={locale}>
                            <DatePicker
                                value={form.openDate}
                                onChange={handleDateChange}
                                format="YYYY-MM-DD"
                                className={`w-full border rounded px-4 py-2 text-[16px] ${errors.openDate ? "border-red-500" : ""}`}
                                getPopupContainer={(trigger) => trigger.parentElement}
                                open={isDatePickerOpen}
                                onOpenChange={(open) => setIsDatePickerOpen(open)}
                            />
                        </ConfigProvider>
                        {errors.openDate && <p className="text-red-500 text-sm">{errors.openDate}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-black text-[16px] font-medium">소유주</label>
                        <input type="text" name="owner" value={form.owner} onChange={handleChange}
                               className={`w-full border rounded px-4 py-2 text-[16px] ${errors.owner ? "border-red-500" : ""}`}
                               placeholder="소유주 입력"/>
                        {errors.owner && <p className="text-red-500 text-sm">{errors.owner}</p>}
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