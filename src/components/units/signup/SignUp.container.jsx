import { useState } from "react";
import { Checkbox } from "antd";
import SignUpUI from "@/src/components/units/signup/SignUp.presenter";
import SignUpModalUI from "./signupModal/SignUpModal.presenter";

export default function SignUp() {
    const [studentNum, setStudentNum] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allChecked, setAllchecked] = useState(false);
    const [checkedList, setCheckedList] = useState({
        option1:false,
        option2:false,
        option3:false
    })
    const [isNextStep, setIsNextStep] = useState(false);
    const [isContractOpen, setIsContractOpen] = useState(false);

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
            option2:isChecked,
            option3:isChecked
        })
    };

    const onAgreeAllClick = (e) => {
        setAllchecked(true);
        setCheckedList({
            option1:true,
            option2:true,
            option3:true
        })
        setIsContractOpen(false);
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

    const onNextStepButton = (e) => {
        setIsNextStep(true);
    };

    const clubOptions = [
        {
            value: 'developer',
            label: '디벨로퍼',
        },
        {
            value: 'club1',
            label: '동아리1',
        },
        {
            value: 'club2',
            label: '동아리2',
        }
    ];

    const majorOptions = [
        {
            value: '1',
            label: '전자정보통신',
        },
        {
            value: '2',
            label: '컴퓨터공학',
        },
        {
            value: '3',
            label: '뭐시기',
        }
    ];

    //약관 모달
    const openContractModal = () => {
        setIsContractModalOpen(true);
    }

    const closeContractModal = () => {
        setIsContractModalOpen(false);
    }

    //약관 전환
    const openContract = () => {
        setIsContractOpen(true);
        console.log(isContractOpen)
    }

    const closeContract = () => {
        setIsContractOpen(false);
        console.log(isContractOpen)
    }


    

    return (
        <>
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
            clubOptions={clubOptions}
            majorOptions={majorOptions}
            openContractModal={openContractModal}
            openContract={openContract}
            closeContract={closeContract}
            isContractOpen={isContractOpen}
            onAgreeAllClick={onAgreeAllClick}
            isNextStep={isNextStep}
            onNextStepButton={onNextStepButton}
        />
        
        {/* <SignUpModalUI
            isOpen={isContractModalOpen}
            onClose={closeContractModal}
        /> */}
      </>

    )
}