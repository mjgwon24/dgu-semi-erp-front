import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Input, Button } from "antd";

export default function ModifyAnnouncementPresenter({
    isOpen,
    onClose,
    form,
    handleChangeTitle,
    handleContentChange,
    handleSubmit,
}) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            handleChangeTitle(e);
        } else if (name === "content") {
            handleContentChange(e);
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slotProps={{
                paper: { style: { width: "480px", height: "580px" } }
            }}
        >
            <DialogTitle className="flex justify-start pt-10 pl-[50px] text-black text-[23px] font-semibold">
                글 수정
            </DialogTitle>

            <DialogContent className="p-6 flex flex-col justify-between h-full items-center">
                <div className="space-y-4 pt-3 w-full px-7">
                    <div className="flex flex-col space-y-1">
                        <div className="flex flex-row items-center space-x-2 w-full">
                            <label className="text-black text-[16px] font-medium w-[80px]">
                                제목
                            </label>

                            <Input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="공지 제목"
                                className="h-[45px] text-[16px] flex-1"
                            />
                        </div>

                        {form.error?.title && (
                            <p className="text-red-500 text-sm mt-1 ml-[90px]">
                                {form.error.title}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-1 w-full">

                        <div className="flex flex-row items-start space-x-2 w-full">
                            <label className="text-black text-[16px] font-medium w-[80px] mt-2">
                                내용
                            </label>

                            <Input.TextArea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                placeholder="공지 내용을 입력하세요"
                                className="flex-1 text-[16px] resize-none h-[350px]"
                            />
                        </div>

                        {form.error?.content && (
                            <p className="text-red-500 text-sm mt-1 ml-[90px]">
                                {form.error.content}
                            </p>
                        )}
                    </div>
                </div>

                <Button
                    type="primary"
                    size="large"
                    className="w-[120px] bg-[#4368BA] text-white text-[16px] font-bold rounded-lg mb-5"
                    onClick={handleSubmit}
                >
                    수정
                </Button>

            </DialogContent>
        </Dialog>
    );
}
