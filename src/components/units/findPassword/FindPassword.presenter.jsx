import Link from "next/link";

export default function FindPasswordUI({
    email,
    password,
    onNameChange,
    onEmailChange,
    handleSubmit
}) {
    return (
        <div className="flex w-full h-screen justify-center items-center" style={{color: "#F7F7F7"}}>
            <form className="flex flex-col items-center border rounded-2xl shadow-xl bg-[#FFFFFF] h-4/5 py-48 px-48 gap-12 w-2/5" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-1">
                    <label className="text-4xl font-bold" style={{color: "#247CE6"}}>동국대학교</label>
                    <label className="text-4xl font-bold" style={{color: "#000000"}}>동아리 <span style={{color: "#247CE6"}}>행정</span> 정보 시스템</label>
                    <label className="text-xl pt-2" style={{color: "#3C3C3C"}}>비밀번호를 잊으셨나요?</label>
                </div>

                <div className="flex flex-col gap-2 w-full text-xl">
                    <input className="border border-[#DBDBDB] rounded-lg p-4 text-[#000000]" type="text" placeholder="이름" onChange={onNameChange}></input>
                    <input className="border border-[#DBDBDB] rounded-lg p-4 text-[#000000]" type="text" placeholder="이메일" onChange={onEmailChange}></input>
                </div>

                <div className="flex flex-col gap-2 w-full items-center">
                    <button className="bg-[#237BE6] rounded-lg w-full text-xl p-4" type="submit">비밀번호 재발급</button>
                    <label className="text-[#3C3C3C]">비밀번호가 생각나셨나요? <Link href={"/login"} className="text-[#247CE6]">로그인</Link> 하러가기</label>
                </div>
            </form>
        </div>
    )
}

//#247CE6