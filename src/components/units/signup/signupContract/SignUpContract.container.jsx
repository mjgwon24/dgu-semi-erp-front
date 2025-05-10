import { useState } from "react";
import { Checkbox } from "antd";
import SignUpContractUI from "@/src/components/units/signup/signupContract/SignUpContract.presenter";

export default function SignUpContract({
    allChecked,
    checkedList,
    isContractOpen,
    onCheckChange,
    onCheckAllChange,
    onAgreeAllClick,
    closeContract
}) {

    return (
        <SignUpContractUI
            onCheckAllChange={onCheckAllChange}
            checkedList={checkedList}
            onCheckChange={onCheckChange}
            allChecked={allChecked}
            closeContract={closeContract}
            isContractOpen={isContractOpen}
            onAgreeAllClick={onAgreeAllClick}
        />
    )
}