import Link from "next/link";
import { ConfigProvider, Checkbox, Select, Input } from "antd";
import { useState } from "react";

export default function SignUpContractUI({
    allChecked,
    checkedList,
    isContractOpen,
    onCheckChange,
    onCheckAllChange,
    onAgreeAllClick,
    closeContract
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


                    
        <div className="w-full">
            <button type="button" onClick={closeContract} className="text-black hover:text-[#808080] focus:outline-none focus:ring-0 bg-transparent">
                <svg class="w-5 h-5 transform rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
            <div className="flex flex-col items-center w-full gap-8">
                <label className="text-3xl font-[700]">전체 약관</label>

                <div className="flex flex-col gap-2 p-4 max-h-[470px] overflow-y-auto">
                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-[700]">소제목 (필수)</label>
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
                        <label className="text-xl font-[700]">소제목</label>
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
                        <label className="text-xl font-[700]">소제목</label>
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

        </ConfigProvider>
    )
}

//#247CE6