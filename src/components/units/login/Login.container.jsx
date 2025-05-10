import { useState } from "react";
import LoginUI from "@/src/components/units/login/Login.presenter";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleSubmit = (e) => {
       e.preventDefault();
       alert(`이메일: ${email}\n비밀번호: ${password}`);
    };

    return (
        <LoginUI
            email={email}
            password={password}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            handleSubmit={handleSubmit}
        />
    )
}