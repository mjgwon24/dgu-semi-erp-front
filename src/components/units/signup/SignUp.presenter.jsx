import Link from "next/link";
import { ConfigProvider, Checkbox, Select } from "antd";
import { useState } from "react";

export default function SignUpUI({
    email,
    password,
    studentNum,
    userName,
    onStudentNumChange,
    onUserNameChange,
    onEmailChange,
    onPasswordChange,
    handleSubmit,
    onCheckAllChange,
    checkedList,
    onCheckChange,
    allChecked,
    clubOptions,
    majorOptions,
    openContractModal
}) {

    return (
        
        <ConfigProvider
            theme={{
                components: {
                Select: {
                    fontSize: "1.125rem",
                    lineHeight: "1.725rem",
                    optionFontSize: "0.9rem"
                },
                },
            }}
            >


                    
        <div className="flex w-full h-screen justify-center items-center" style={{color: "#F7F7F7"}}>
            <form className="flex flex-col items-center border rounded-2xl shadow-xl bg-[#FFFFFF] h-5/6 py-14 px-32 gap-8 w-2/5" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-1">
                    <label className="text-3xl font-bold" style={{color: "#247CE6"}}>동국대학교</label>
                    <label className="text-3xl font-bold" style={{color: "#000000"}}>동아리 <span style={{color: "#247CE6"}}>행정</span> 정보 시스템</label>
                    <label className="text-lg pt-2" style={{color: "#3C3C3C"}}>동아리 행정을 보다 편리하게</label>
                </div>

                <div className="flex flex-col gap-2 w-full text-lg">
                    <input className="border border-[#DBDBDB] rounded-lg p-4 text-[#000000]" type="text" placeholder="학번" onChange={onStudentNumChange}></input>
                    <Select placeholder="전공" options={majorOptions} style={{height:"62px"}}></Select>
                    <Select placeholder="동아리" options={clubOptions} style={{height:"62px"}}></Select>
                    {/* <input className="border border-[#DBDBDB] rounded-lg p-4 text-[#000000]" type="text" placeholder="이메일" onChange={onEmailChange}></input> */}
                    <div className="flex flex-row w-full gap-2">
                        <input className="border border-[#DBDBDB] rounded-lg p-4 text-[#000000] grow" type="text" placeholder="이메일" onChange={onPasswordChange}></input>
                        <button className="bg-[#237BE6] rounded-lg text-base p-4 px-8">인증</button>
                    </div>
                    
                    <Checkbox className="text-base font-bold text-[#3C3C3C]" checked={allChecked} onChange={onCheckAllChange}>전체 동의</Checkbox>

                    <div className="flex flex-row items-center w-full">
                        <Checkbox className=" text-[#808080]" checked={checkedList.option1} onClick={openContractModal} onChange={onCheckChange} name="option1">19세 이상??</Checkbox>
                        <button className="text-[#808080] text-base">&gt;</button>
                    </div>
                    <div className="flex flex-row items-center w-full">
                        <Checkbox className=" text-[#808080]" checked={checkedList.option2} onChange={onCheckChange} name="option2">이용약관 동의</Checkbox>
                        <button className="text-[#808080] text-base">&gt;</button>
                    </div>
                    
                    

                    {/* <Checkbox className="text-lg text-[#3C3C3C]">19세 이상??</Checkbox>
                    <Checkbox className="text-lg text-[#3C3C3C]">이용약관 동의</Checkbox> */}
                </div>

                <div className="flex flex-col gap-2 w-full items-center">
                    <button className="bg-[#237BE6] rounded-lg w-full text-base p-4" type="submit">회원가입</button>
                    <label className="text-[#3C3C3C]">이미 계정이 있으신가요? <Link href={"/login"} className="text-[#247CE6]">로그인</Link> 하러가기</label>
                </div>


            </form>
        </div>

        </ConfigProvider>
    )
}

//#247CE6