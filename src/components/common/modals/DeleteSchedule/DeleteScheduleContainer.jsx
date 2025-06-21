import { useState } from "react";
import DeleteSchedulePresenter from "./DeleteSchedulePresenter";

export default function DeleteScheduleContainer({ isOpen, onClose, deleteSchedule, deleteType, scheduleToDelete, handleExcludeDate }) {
    if (!isOpen) return null;
    
    const handleConfirmDelete = () => {
        if (!scheduleToDelete) return;
        console.log(scheduleToDelete.id);
        deleteSchedule(scheduleToDelete.id);
        onClose();
    };

    const handleExcludeDateConfirm = () => {
        handleExcludeDate();
    }

    


    return (
        <DeleteSchedulePresenter
            isOpen={isOpen}
            onClose={onClose}
            deleteType={deleteType}
            onConfirm={handleConfirmDelete}
            handleExcludeDateConfirm={handleExcludeDateConfirm}
        />
    );
}
