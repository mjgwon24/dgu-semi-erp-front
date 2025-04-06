import Link from "next/link";
import { ConfigProvider, Checkbox, Select, Input } from "antd";
import { useState } from "react";
import SignUpContract from "./signupContract/SignUpContract.container";

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
    openContract,
    closeContract,
    isContractOpen,
    onAgreeAllClick,
    isNextStep,
    onNextStepButton
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

                Input: {
                    fontSize: "1.125rem",
                    lineHeight: "1.725rem",
                }
                },
            }}
            >
                    
        <div className="flex w-full h-screen justify-center items-center bg-[#F7F7F7]">
            <div className="flex flex-col items-center justify-center border rounded-2xl shadow-xl bg-[#FFFFFF] h-5/6 py-14 px-32 w-2/5 min-w-[600px]">
            {isContractOpen ? 
            
            (
                <SignUpContract
                    allChecked={allChecked}
                    checkedList={checkedList}
                    isContractOpen={isContractOpen}
                    onCheckChange={onCheckChange}
                    onCheckAllChange={onCheckAllChange}
                    onAgreeAllClick={onAgreeAllClick}
                    closeContract={closeContract}
                />
            ) : (
            <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center">
                    <label className="text-3xl font-[700]" style={{color: "#247CE6"}}>동국대학교</label>
                    <label className="text-3xl font-[700]" style={{color: "#000000"}}>동아리 <span style={{color: "#247CE6"}}>행정</span> 정보 시스템</label>
                    <label className="text-lg pt-2" style={{color: "#3C3C3C"}}>동아리 행정을 보다 편리하게</label>
                </div>

                {isNextStep ? (
        
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2 w-full text-lg">
                        <Input placeholder="학번" style={{height:"62px", padding:"11px"}}/> 
                        <Select placeholder="전공" options={majorOptions} style={{height:"62px"}}/>
                        <Select placeholder="동아리" options={clubOptions} style={{height:"62px"}}/>

                        <div className="flex flex-row w-full gap-2">
                            <Input placeholder="이메일" style={{height:"62px", padding:"11px"}}/> 
                            <button className="bg-[#237BE6] rounded-lg text-base px-10 text-[#FFFFFF]" style={{ height: "62px", whiteSpace: "nowrap" }}>인증</button>
                        </div>
                    
                        <Checkbox className="text-base font-[700] text-[#3C3C3C]" checked={allChecked} onChange={onCheckAllChange}>전체 동의</Checkbox>

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
                    
                    </div>

                    <div className="flex flex-col gap-2 w-full items-center">
                        <button className="bg-[#237BE6] rounded-lg w-full text-base p-4 text-[#FFFFFF]" type="submit">회원가입</button>
                        <label className="text-[#3C3C3C]">이미 계정이 있으신가요? <Link href={"/login"} className="text-[#247CE6]">로그인</Link> 하러가기</label>
                    </div>
                </div>
                    
            ) : (
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2 w-full text-lg">
                        <Input placeholder="계정명" style={{height:"62px", padding:"11px"}}/> 
                        <Input placeholder="이름" style={{height:"62px", padding:"11px"}}/>
                        <Input placeholder="비밀번호" style={{height:"62px", padding:"11px"}}/>
                    
                    </div>

                    <div className="flex flex-col gap-2 w-full items-center">
                        <button className="bg-[#237BE6] rounded-lg w-full text-base p-4 text-[#FFFFFF]" type="button"   onClick={(e) => {
                            e.preventDefault();
                            onNextStepButton();
                        }}>다음</button>
                        <label className="text-[#3C3C3C]">이미 계정이 있으신가요? <Link href={"/login"} className="text-[#247CE6]">로그인</Link> 하러가기</label>
                    </div>
                </div>
            )}
                
            </form>
            )}
                
            </div>
        </div>

        </ConfigProvider>
    )
}

//#247CE6