import { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export default function AddBankbook({ isOpen, onClose, onSave }) {
    const [form, setForm] = useState({
        clubName: "",
        bankName: "",
        accountNumber: "",
        openDate: "",
        owner: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(form);
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slotProps={{
                paper: { style: { width: "450px", height: "530px" } }
            }}
        >
            <DialogTitle className="flex justify-start pl-[50px] pt-10 text-black font-[Pretendard] text-[23px] font-semibold">
                통장 추가
            </DialogTitle>

            <DialogContent className="p-6 flex flex-col justify-between h-full items-center">
                <div className="space-y-4 pt-3 w-full px-7">
                    <div className="flex items-center space-x-4">
                        <label className="text-black font-[Pretendard] text-[16px] font-medium w-[100px]">
                            동아리
                        </label>
                        <input type="text" name="clubName" value={form.clubName} onChange={handleChange}
                               className="w-full border rounded px-4 py-2 text-[16px]" placeholder="동아리 이름 입력" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="text-black font-[Pretendard] text-[16px] font-medium w-[100px]">
                            은행
                        </label>
                        <input type="text" name="bankName" value={form.bankName} onChange={handleChange}
                               className="w-full border rounded px-4 py-2 text-[16px]" placeholder="은행 입력" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="text-black font-[Pretendard] text-[16px] font-medium w-[100px]">
                            계좌번호
                        </label>
                        <input type="text" name="accountNumber" value={form.accountNumber} onChange={handleChange}
                               className="w-full border rounded px-4 py-2 text-[16px]" placeholder="계좌번호 입력" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="text-black font-[Pretendard] text-[16px] font-medium w-[100px]">
                            개설일
                        </label>
                        <input type="date" name="openDate" value={form.openDate} onChange={handleChange}
                               className="w-full border rounded px-4 py-2 text-[16px]" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="text-black font-[Pretendard] text-[16px] font-medium w-[100px]">
                            소유주
                        </label>
                        <input type="text" name="owner" value={form.owner} onChange={handleChange}
                               className="w-full border rounded px-4 py-2 text-[16px]" placeholder="소유주 입력" />
                    </div>
                </div>

                <button onClick={handleSubmit}
                        className="w-[120px] h-[40px] bg-[#4368BA] text-white text-center
                                   font-[Pretendard] text-[16px] font-bold rounded-lg hover:bg-blue-700">
                    추가
                </button>
            </DialogContent>
        </Dialog>
    );
}