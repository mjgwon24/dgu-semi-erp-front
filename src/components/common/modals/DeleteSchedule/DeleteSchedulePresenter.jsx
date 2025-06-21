import { ConfigProvider, DatePicker, Button, Select } from "antd";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export default function DeleteSchedulePresenter({
    isOpen,
    onClose,
    deleteType,
    onConfirm,
    handleExcludeDateConfirm
}) {
    

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slotProps={{
                paper: { style: { width: "450px", height: "auto", overflow: "visible" } }
            }}
        >
        
            <DialogTitle className="flex justify-start text-black text-[23px] font-[500]">
                {deleteType === "normal" ? "일정 삭제" : "반복 일정 삭제"}
            </DialogTitle>

            <DialogContent className="flex flex-col justify-between h-full items-center gap-2">
                {deleteType === "normal" ? (
                    <Button className="w-full" color="danger" variant="outlined" onClick={onConfirm}>
                        삭제
                    </Button>
                ) : (
                    <>
                        <Button className="w-full" onClick={handleExcludeDateConfirm}>
                            이 일정만 삭제
                        </Button>
                        <Button className="w-full" color="danger" variant="outlined" onClick={onConfirm}>
                            반복 일정 전체 삭제
                        </Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
