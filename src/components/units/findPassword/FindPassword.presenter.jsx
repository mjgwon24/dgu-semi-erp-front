import Link from "next/link";
import { ConfigProvider, Input } from "antd";

export default function FindPasswordUI({
    email,
    password,
    onNameChange,
    onEmailChange,
    handleSubmit
}) {
    return (

        <ConfigProvider
            theme={{
                components: {
                    
                Input: {
                    fontSize: "1.125rem",
                    lineHeight: "1.725rem",
                }
                },
            }}
            >

           
        <div className="flex w-full h-screen min-h-[900px] justify-center items-center bg-[#F7F7F7]">
            <form className="flex flex-col items-center justify-center border rounded-2xl shadow-xl bg-[#FFFFFF] h-5/6 py-40 px-32 gap-12 w-2/5 min-w-[600px]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-12 w-full">
                    <div className="flex flex-col items-center">
                        <label className="text-3xl font-[700] text-[#247CE6]">동국대학교</label>
                        <label className="text-3xl font-[700]" style={{color: "#000000"}}>동아리 <span
                            style={{color: "#247CE6"}}>행정</span> 정보 시스템</label>
                        <label className="text-lg pt-2" style={{color: "#3C3C3C"}}>비밀번호를 잊으셨나요?</label>
                    </div>

                    <div className="flex flex-col gap-2 w-full text-lg">
                        <Input placeholder="이름" style={{height:"62px", padding:"11px"}} onChange={onNameChange}/>
                        <Input placeholder="이메일" style={{height:"62px", padding:"11px"}} onChange={onEmailChange}/> 
                    </div>

                    <div className="flex flex-col gap-2 w-full items-center">
                        <button className="bg-[#237BE6] rounded-lg w-full text-lg p-4 text-[#FFFFFF]" type="submit">비밀번호 재발급</button>
                        <label className="text-[#3C3C3C]">비밀번호가 생각나셨나요? <Link href={"/login"} className="text-[#247CE6]">로그인</Link> 하러가기</label>
                        <label className="invisible">하단 패딩용</label>
                    </div>
                </div>
            </form>
        </div>

        </ConfigProvider>
    )
}

//#247CE6