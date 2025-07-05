import { useState, useEffect } from "react";
import { Checkbox } from "antd";
import SignUpUI from "@/src/components/units/signup/SignUp.presenter";
import SignUpModalUI from "./signupModal/SignUpModal.presenter";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import api from "../../common/api";
import { setAccessToken } from "@/redux/slices/authSlice";

export default function SignUp() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [studentNum, setStudentNum] = useState("");
    const [userName, setUserName] = useState("");
    const [otpEmail, setOtpEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allChecked, setAllchecked] = useState(false);
    const [checkedList, setCheckedList] = useState({
        option1:false,
        option2:false,
        option3:false
    })
    const [isNextStep, setIsNextStep] = useState(false);
    const [isContractOpen, setIsContractOpen] = useState(false);

    const [otpCode, setOtpCode] = useState("");
    const [nickname, setNickname] = useState("");
    const [otpRequestToken, setOtpRequestToken] = useState("");
    const [clubList, setClubList] = useState([]);
    const [selectedClubId, setSelectedClubId] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const [majorOptions, setMajorOptions] = useState([]);

    const [isOtpRequested, setIsOtpRequested] = useState(false);

    const [otpVerificationToken, setOtpVerificationToken] = useState("");

    const [selectedMajor, setSelectedMajor] = useState("");

    const verifyOtp = async () => {
      try {
        const res = await api.post("/auth/verify-otp", {
          email: otpEmail,
          otp: otpCode,
          otpRequestToken,
        });
        setOtpVerificationToken(res.data);
        alert("OTP 인증이 완료되었습니다.");
      } catch (err) {
        alert("OTP 인증에 실패했습니다.");
      }
    };

    const onStudentNumChange = (e) => {
        setStudentNum(e.target.value);
    };

    const onUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const onEmailChange = (e) => {
        setOtpEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!otpVerificationToken) {
        alert("OTP 인증을 먼저 완료해주세요.");
        return;
      }
      try {
        await api.post("/auth/signUp", {
          email: otpEmail,
          username: otpEmail,
          password: otpCode,
          nickname: nickname || otpEmail,
          major: selectedMajor,
          studentNumber: studentNum,
          clubId: selectedClubId,
          role: "MEMBER",
          otpVerificationToken,
        });

        const loginRes = await api.post("/auth/signIn", {
          username: otpEmail,
          password: otpCode,
        });
        dispatch(setAccessToken(loginRes.data.accessToken));
        router.push("/");
      } catch (err) {
        console.error("회원가입 실패:", err);
        alert("회원가입 중 오류가 발생했습니다.");
      }
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

    useEffect(() => {
      async function fetchClubs() {
        try {
          const res = await api.get("/club/all");
          setClubList(res.data);
        } catch (err) {
          console.error("동아리 목록 조회 실패:", err);
        }
      }
      fetchClubs();
      async function fetchMajors() {
        try {
          const res = await api.get("/user/majors");
          const formatted = res.data.map((major) => ({
            label: major.label,
            value: major.name,
          }));
          setMajorOptions(formatted);
        } catch (err) {
          console.error("전공 목록 불러오기 실패:", err);
        }
      }
      fetchMajors();
    }, []);

    const clubOptions = clubList.map((c) => ({ label: c.name, value: c.id }));

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

    const requestOtp = async () => {
      if (!otpEmail || otpEmail.trim() === "") {
        alert("이메일을 입력해주세요.");
        return;
      }
      try {
        const res = await api.post(`/auth/request-otp?email=${otpEmail}`);
        setOtpRequestToken(res.data);
        setIsOtpRequested(true);
        alert("OTP가 이메일로 전송되었습니다.");
      } catch (err) {
        alert("OTP 요청 중 오류가 발생했습니다.");
      }
    };



    return (
        <>
        <SignUpUI
            email={otpEmail}
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
            otpCode={otpCode}
            onOtpChange={(e) => setOtpCode(e.target.value)}
            nickname={nickname}
            onNicknameChange={(e) => setNickname(e.target.value)}
            selectedClubId={selectedClubId}
            setSelectedClubId={setSelectedClubId}
            requestOtp={requestOtp}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isOtpRequested={isOtpRequested}
            verifyOtp={verifyOtp}
            selectedMajor={selectedMajor}
            setSelectedMajor={setSelectedMajor}
        />
        
        {/* <SignUpModalUI
            isOpen={isContractModalOpen}
            onClose={closeContractModal}
        /> */}
      </>

    )
}