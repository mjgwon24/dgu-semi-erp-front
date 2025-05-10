import { useState } from "react";
import FindPasswordUI from "@/src/components/units/findPassword/FindPassword.presenter";

export default function FindPassword() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    
    
    const handleSubmit = (e) => {
       e.preventDefault();
       alert(`이름: ${name}\n이메일: ${email}`);
    };

    return (
        <FindPasswordUI
            email={email}
            name={name}
            onEmailChange={onEmailChange}
            onNameChange={onNameChange}
            handleSubmit={handleSubmit}
        />
    )
}