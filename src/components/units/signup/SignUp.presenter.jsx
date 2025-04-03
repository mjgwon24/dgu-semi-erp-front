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
    openContractModal,
    openContract,
    closeContract,
    isContractOpen,
    onAgreeAllClick
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


                    
        <div className="flex w-full h-screen justify-center items-center bg-[#F7F7F7]">
            <div className="flex flex-col items-center border rounded-2xl shadow-xl bg-[#FFFFFF] h-5/6 py-14 px-32 w-2/5">
            {isContractOpen ? 
            
            (
                <div className="w-full">
                    <button type="button" onClick={closeContract} className=" hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center me-2 dark:text-blue-600 dark:hover:text-blue-700 dark:focus:ring-blue-800 bg-transparent">
                        <svg class="w-5 h-5 transform rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                    <div className="flex flex-col items-center w-full gap-8">
                        <label className="text-3xl font-bold">전체 약관</label>

                        <div className="flex flex-col gap-2 p-4 max-h-[470px] overflow-y-auto">
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-bold">소제목 (필수)</label>
                            <div className="max-h-40 overflow-y-auto border border-[#DBDBDB] p-6 rounded-lg text-[#3C3C3C]">
                            <p className="whitespace-pre-line">
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기

                            </p>
                            </div>
                            <Checkbox className=" text-[#1E7EE4]"name="option1" checked={checkedList.option1} onChange={onCheckChange}>동의</Checkbox>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-bold">소제목</label>
                            <div className="max-h-40 overflow-y-auto border border-[#DBDBDB] p-6 rounded-lg text-[#3C3C3C]">
                            <p className="whitespace-pre-line">
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기

                            </p>
                            </div>
                            <Checkbox className=" text-[#1E7EE4]"name="option2" checked={checkedList.option2} onChange={onCheckChange}>동의</Checkbox>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-bold">소제목</label>
                            <div className="max-h-40 overflow-y-auto border border-[#DBDBDB] p-6 rounded-lg text-[#3C3C3C]">
                            <p className="whitespace-pre-line">
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기
                                약관내용 어쩌고 저쩌고 이렇고 저렇고 뭐시기 거시기

                            </p>
                            </div>
                            <Checkbox className=" text-[#1E7EE4]"name="option3" checked={checkedList.option3} onChange={onCheckChange}>동의</Checkbox>
                        </div>
                        
                    </div>
                        <button className="bg-[#237BE6] text-[#FFFFFF] rounded-lg w-full text-xl p-4" type="button" onClick={onAgreeAllClick}>전체 동의</button>
                    </div>
                </div>
            ) : (
                <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
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
                        <button className="bg-[#237BE6] rounded-lg text-base p-4 px-8 text-[#FFFFFF]">인증</button>
                    </div>
                    
                    <Checkbox className="text-base font-bold text-[#3C3C3C]" checked={allChecked} onChange={onCheckAllChange}>전체 동의</Checkbox>

                    <div className="flex flex-row items-center w-full">
                        <Checkbox className=" text-[#808080]" checked={checkedList.option1} onChange={onCheckChange} name="option1">19세 이상??</Checkbox>
                        <button className="text-[#808080] text-base" onClick={openContract}>&gt;</button>
                    </div>
                    <div className="flex flex-row items-center w-full">
                        <Checkbox className=" text-[#808080]" checked={checkedList.option2} onChange={onCheckChange} name="option2">이용약관 동의</Checkbox>
                        <button className="text-[#808080] text-base" onClick={openContract}>&gt;</button>
                    </div>
                    <div className="flex flex-row items-center w-full">
                        <Checkbox className=" text-[#808080]" checked={checkedList.option3} onChange={onCheckChange} name="option3">이용약관 동의</Checkbox>
                        <button className="text-[#808080] text-base" onClick={openContract}>&gt;</button>
                    </div>
                    
                    

                    {/* <Checkbox className="text-lg text-[#3C3C3C]">19세 이상??</Checkbox>
                    <Checkbox className="text-lg text-[#3C3C3C]">이용약관 동의</Checkbox> */}
                </div>

                <div className="flex flex-col gap-2 w-full items-center">
                    <button className="bg-[#237BE6] rounded-lg w-full text-base p-4 text-[#FFFFFF]" type="submit">회원가입</button>
                    <label className="text-[#3C3C3C]">이미 계정이 있으신가요? <Link href={"/login"} className="text-[#247CE6]">로그인</Link> 하러가기</label>
                </div>
            </form>
            )}
                
            </div>
        </div>

        </ConfigProvider>
    )
}

//#247CE6