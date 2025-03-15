import { useState } from "react";
import { Checkbox } from "antd";
import SignUpUI from "@/src/components/units/signup/SignUp.presenter";

export default function SignUp() {
    const [studentNum, setStudentNum] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allChecked, setAllchecked] = useState(false);
    const [checkedList, setCheckedList] = useState({
        option1:false,
        option2:false
    })

    const onStudentNumChange = (e) => {
        setStudentNum(e.target.value);
    };

    const onUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleSubmit = (e) => {
       e.preventDefault();
       alert(`학번: ${studentNum}\n계정명: ${userName}\n이메일: ${email}\n비밀번호: ${password}`);
    };

    
    const onCheckAllChange = (e) => {
        const isChecked = e.target.checked;
        setAllchecked(isChecked);
        setCheckedList({
            option1:isChecked,
            option2:isChecked
        })
    };
    
      // 개별 체크박스 클릭 시
      const onCheckChange = (e) => {
        const { name, checked } = e.target;
        setCheckedList((prev) => {
            const updatedCheckedList = {
                ...prev,
            [name]: checked,
            };

            const isAllChecked = Object.values(updatedCheckedList).every(Boolean);
            setAllchecked(isAllChecked);
            return updatedCheckedList;
        });


      };


    

    return (
        <SignUpUI
            email={email}
            password={password}
            studentNum={studentNum}
            userName={userName}
            onStudentNumChange={onStudentNumChange}
            onUserNameChange={onUserNameChange}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            handleSubmit={handleSubmit}
            onCheckAllChange={onCheckAllChange}
            checkedList={checkedList}
            onCheckChange={onCheckChange}
            allChecked={allChecked}
        />
    )
}