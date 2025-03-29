import { useState } from "react";
import { Checkbox } from "antd";
import SignUpModalUI from "@/src/components/units/signup/signupModal/SignUpModal.presenter";

export default function SignUpModal({ isOpen, onClose, checkedList, setCheckedList, setAllChecked }) {
    if (!isOpen) return null;

    const onCheckAll = () => {
      const updatedCheckedList = {
          option1: true,
          option2: true,
      };

      setCheckedList(updatedCheckedList);
      setAllChecked(true);  // 부모 상태에도 반영
      onClose();  // 모달 닫기
  };

  return <SignUpModalUI onClose={onCheckAll} />;



}