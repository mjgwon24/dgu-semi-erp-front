import Link from "next/link";

export default function LoginUI({
    email,
    password,
    onEmailChange,
    onPasswordChange,
    handleSubmit
}) {
    return (
        <div className="flex w-full h-screen justify-center items-center" style={{color: "#F7F7F7"}}>
            <form className="flex flex-col items-center border rounded-2xl shadow-xl bg-[#FFFFFF] h-4/5 py-48 px-24 gap-12 w-2/5" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-1">
                    <label className="text-4xl font-bold" style={{color: "#247CE6"}}>동국대학교</label>
                    <label className="text-4xl font-bold" style={{color: "#000000"}}>동아리 <span style={{color: "#247CE6"}}>행정</span> 정보 시스템</label>
                    <label className="text-xl" style={{color: "#3C3C3C"}}>동아리 행정을 보다 편리하게</label>
                </div>

                <div className="flex flex-col gap-2 w-full text-xl">
                    <input className="border border-[#DBDBDB] rounded-lg p-4 text-[#000000]" type="text" placeholder="이메일 또는 계정명" onChange={onEmailChange}></input>
                    <input className="border border-[#DBDBDB] rounded-lg p-4 text-[#000000]" type="password" placeholder="비밀번호" onChange={onPasswordChange}></input>
                </div>

                <div className="flex flex-col gap-2 w-full items-center">
                    <button className="bg-[#237BE6] rounded-lg w-full text-xl p-4" type="submit">로그인</button>
                    <label className="text-[#3C3C3C]">처음이신가요? 지금 바로 <Link href={"/signup"} className="text-[#247CE6]">가입</Link> 해보세요</label>
                    <Link href={"/findPassword"} className="text-[#808080]">비밀번호 찾기</Link>
                </div>
            </form>
        </div>
    )
}

//#247CE6