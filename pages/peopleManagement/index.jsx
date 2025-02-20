import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";
import ConditionBar from "@/src/components/common/layout/conditions/conditionbar";
import TableWrapper from "@/src/components/common/layout/table/tableWrapper";
import EditableTable from "@/src/components/common/layout/table/editableTable";
import { useState,useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import PeopleManagementPage from "@/src/components/units/peopleManagement/peopleManagement.container";
dayjs.locale('zh-cn');
export default function SamplePage() {
    return (
        <PeopleManagementPage/>
)
    ;
}