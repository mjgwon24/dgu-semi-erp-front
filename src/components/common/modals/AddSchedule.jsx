import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, MenuItem, Select } from "@mui/material";

export default function AddSchedule({ isOpen, onClose, onSave }) {
    const [form, setForm] = useState({
        title: "",
        clubName: "",
        date: "",
        location: "",
        repeat: "안함",
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
            <DialogTitle className="flex justify-start pt-10 pl-[50px] text-black font-[Pretendard] text-[23px] font-semibold">
                일정 추가
            </DialogTitle>

            <DialogContent className="p-6 flex flex-col justify-between h-full items-center">
                <div className="space-y-4 pt-3 w-full px-7">
                    <div className="flex items-center space-x-4">
                        <label className="text-black font-[Pretendard] text-[16px] font-medium w-[80px]">
                            제목
                        </label>
                        <input type="text" name="title" value={form.title} onChange={handleChange}
                               className="w-full border rounded px-4 py-2 text-[16px]" placeholder="일정 제목 입력"/>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="text-black font-[Pretendard] text-[16px] font-medium w-[80px]">
                            동아리
                        </label>
                        <input type="text" name="clubName" value={form.clubName} onChange={handleChange}
                               className="w-full border rounded px-4 py-2 text-[16px]" placeholder="동아리 이름 입력"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="text-black font-[Pretendard] text-[16px] font-medium w-[80px]">
                            일시
                        </label>
                        <input type="date" name="date" value={form.date} onChange={handleChange}
                               className="w-full border rounded px-4 py-2 text-[16px]"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="text-black font-[Pretendard] text-[16px] font-medium w-[80px]">
                            장소
                        </label>
                        <input type="text" name="location" value={form.location} onChange={handleChange}
                               className="w-full border rounded px-4 py-2 text-[16px]" placeholder="장소 입력"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="text-black font-[Pretendard] text-[16px] font-medium w-[80px]">
                            반복
                        </label>
                        <Select
                            name="repeat"
                            value={form.repeat}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-2 h-[45px]"
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        marginTop: "8px",
                                        borderRadius: "5px",
                                    }
                                },
                            }}
                        >
                            <MenuItem
                                value="안함"
                                sx={{
                                    borderTopLeftRadius: "5px",
                                    borderTopRightRadius: "5px",
                                    padding: "10px 16px",
                                }}
                            >
                                안함
                            </MenuItem>
                            <MenuItem value="매일" sx={{ minHeight: "unset" }}>매일</MenuItem>
                            <MenuItem value="매주" sx={{ minHeight: "unset" }}>매주</MenuItem>
                            <MenuItem
                                value="매월"
                                sx={{
                                    borderBottomLeftRadius: "5px",
                                    borderBottomRightRadius: "5px",
                                    padding: "10px 16px",
                                }}
                            >
                                매월
                            </MenuItem>
                        </Select>
                    </div>
                </div>

                <button onClick={handleSubmit}
                        className="w-[120px] h-[40px] bg-[#4368BA] text-white text-center
                                   font-[Pretendard] text-[16px] font-bold rounded-lg hover:bg-blue-700 mt-4">
                    추가
                </button>
            </DialogContent>
        </Dialog>
    );
}