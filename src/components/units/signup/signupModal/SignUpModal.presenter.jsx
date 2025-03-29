import Link from "next/link";
import { Checkbox, Select } from "antd";
import { useState } from "react";

export default function SignUpModalUI({ isOpen, onClose }) {
    if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/5">
          <button type="button" onClick={onClose} class=" hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center me-2 dark:text-blue-600 dark:hover:text-blue-700 dark:focus:ring-blue-800 bg-transparent">
              <svg class="w-5 h-5 transform rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </button>
          <div className="flex flex-col items-center w-full gap-6 pt-6 pb-8">
            <label className="text-3xl font-bold">전체 약관</label>

            <div className="flex flex-col gap-2 p-4 w-4/5 max-h-[470px] overflow-y-auto">
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
                <Checkbox className=" text-[#1E7EE4]"name="option1">동의</Checkbox>
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
                <Checkbox className=" text-[#1E7EE4]"name="option1">동의</Checkbox>
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
                <Checkbox className=" text-[#1E7EE4]"name="option1">동의</Checkbox>
              </div>
              
            </div>

            

            <button className="bg-[#237BE6] text-[#FFFFFF] rounded-lg w-4/5 text-xl p-4" type="button" onClick={onClose}>전체 동의</button>
          </div>
        </div>
      </div>
    );
  }

//#247CE6