import BankbookManagementUI from "./bankbookManagement.presenter";
import { useState,useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {useAccountClubs, useAccountInfo} from "@/src/hooks/useAccountInfo";

dayjs.locale('zh-cn');

/**
 * 동아리 목록 API 데이터 변환
 */
function mapClubsToDataSource(clubs) {
    if (!Array.isArray(clubs)) return [];

    return clubs.map((club, index) => ({
        No: index + 1,
        crew: club.clubName || '',
        origin: club
    }));
}

/**
 * 통장 상세 API 데이터 변환
 */
function mapAccountInfoToDataSource2(accountInfo) {
    if (!accountInfo || !Array.isArray(accountInfo.accountHistories)) return [];

    const typeMap = {
        DEPOSIT: '입금',
        WITHDRAW: '출금',
        TRANSFER: '이체'
    };

    return accountInfo.accountHistories.map((history, index) => ({
        No: index + 1,
        tradetype: typeMap[history.payType] || '',
        content: history.content || '',
        amount: String(history.totalAmount ?? 0),
        restAmount: String(history.usedAmount ?? 0),
        bankbook: {
            bankbookNumber: accountInfo.number || '',
            createdAt: accountInfo.createdAt ? accountInfo.createdAt.slice(0, 10) : '',
            owner: accountInfo.ownerName || ''
        },
        origin: history
    }));
}

/**
 * 동아리 통장 관리 페이지
 * @lastModified 2025.06.24
 */
export default function BankbookManagementPage() {
    const permission1 = "notadmin";
    const permission2 = "admin";

    const [selected,setSelected] = useState(-1);    // 동아리 목록 선택 인덱스
    const [selected2,setSelected2] = useState(-1);  // 거래내역 선택 인덱스

    const [currentPage,setCurrentPage] = useState(1);
    const [currentPage2,setCurrentPage2] = useState(1);

    /**
     * 동아리 목록 컬럼 정의
     */
    const defaultColumns = [
        {
            title: 'No',
            dataIndex: 'No',
            width: '30%',
            editable: false,
            type:'id'
        },
        {
            title: '동아리',
            dataIndex: 'crew',
            width: '70%',
            editable: true,
            type:'select',
            selects:['컴퓨터공학과','전자정보통신학과','기계시스템공학과'],

        }
    ];

    /**
     * 거래내역 컬럼 정의
     */
    const defaultColumns2 = [
        {
            title: 'No',
            dataIndex: 'No',
            width: '4%',
            editable: false,
            type:'id'
        },
        {
            title: '거래 유형',
            dataIndex: 'tradetype',
            width: '5%',
            editable: true,
            type:'select',
            selectboxWidth:'70px',
            selects:['입금','출금','이체']
        },
        {
            title:'내용',
            dataIndex: 'content',
            width: '15%',
            editable: true,
            type:'text',
            maxlength:7
        },
        {
            title: '금액',
            dataIndex: 'amount',
            width: '8%',
            editable: true,
            type:'money',

        },
        {
            title:'남은 금액',
            dataIndex: 'restAmount',
            width: '8%',
            editable: true,
            type:'money'
        }
    ];

    /**
     * 검색 조건, 라벨, 옵션
     */
    const [conditions, setConditions] = useState({
        expenseType: "이름",
        clubName: "이메일",
        currentPeoples: {from: 0, to: 5000000},
        totalPeoples: {from: 0, to: 5000000}
    });

    const labels = {
        status: "상태",
        clubName: "동아리",
        currentPeoples: "활동 인원",
        totalPeoples: "누적 인원"
    };

    const orderKeys = [
        "status",
        "clubName",
        "currentPeoples",
        "totalPeoples"
    ];

    const types = {
        clubName: "selectWithSearch",
        status: "select",
        currentPeoples:"rangeNumber",
        totalPeoples:"rangeNumber"
    };

    const options = {
        status: ["모집중", "마감"],
        clubName: ["빅데이터 동아리", "머신러닝 동아리", "개발 동아리"]
    };

    /**
     * API 호출
     */
    const { data: clubsData, isLoading: isClubsLoading } = useAccountClubs(currentPage - 1, 8);
    const clubs = clubsData?.clubs || [];
    const dataSource = mapClubsToDataSource(clubs);
    const selectedClubOrigin = dataSource[selected]?.origin;
    const clubId = selectedClubOrigin?.clubId ?? null;

    const { data: accountInfoData, isLoading: isAccountInfoLoading } = useAccountInfo(clubId, currentPage2 - 1, 8);
    const dataSource2 = mapAccountInfoToDataSource2(accountInfoData);

    /**
     * 동아리 추가 핸들러 (mutation 사용 등 로직 변경 필요)
     */
    const handleAdd = () => {
        const newData = defaultColumns.reduce((acc, column) => {
            const { dataIndex, type } = column;
            if (type === 'text') acc[dataIndex] = '';
            else if (type === 'select') acc[dataIndex] = column.selects ? column.selects[0] : '';
            else if (type === 'date') acc[dataIndex] = dayjs().format('YYYY-MM-DD');
            else if (type === 'file') acc[dataIndex] = null;
            else if (type === 'id') acc[dataIndex] = count + 1;
            else if (type === 'money') acc[dataIndex] = 0;
            else if (type === 'number') acc[dataIndex] = 0;
            else acc[dataIndex] = '';
            return acc;
        }, {});
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    /**
     * 거래내역 추가 핸들러 (로직 변경 필요)
     */
    const handleAdd2 = () => {
        const newData = defaultColumns2.reduce((acc, column) => {
            const { dataIndex, type } = column;
            if (type === 'text') acc[dataIndex] = '';
            else if (type === 'select') acc[dataIndex] = column.selects ? column.selects[0] : '';
            else if (type === 'date') acc[dataIndex] = dayjs().format('YYYY-MM-DD'); // 현재 날짜
            else if (type === 'file') acc[dataIndex] = null;
            else if (type === 'id') acc[dataIndex] = count2 + 1;
            else if (type === 'money') acc[dataIndex] = 0;
            else if (type === 'number') acc[dataIndex] = 0;
            else acc[dataIndex] = ''; // 나머지는 빈 문자열로 초기화
            return acc;
        }, {});
        setDataSource2([...dataSource2, newData]);
        setCount2(count2 + 1);
    };

    /**
     * 아래 로직은 사용되는지 확인 필요함
     */
        // const today = new Date();
        // const todayString = today.toISOString().split("T")[0];
        // const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
        // const lastMonthString = lastMonth.toISOString().split("T")[0];
    const [count, setCount] = useState(null);
    const [count2, setCount2] = useState(null);

    return (
        <BankbookManagementUI
            conditions={conditions}
            setConditions={setConditions}
            labels={labels}
            orderKeys={orderKeys}
            options={options}
            types={types}
            dataSource={dataSource}
            setDataSource={() => {}} // 변경 필요
            permission1={permission1}
            handleAdd={handleAdd}
            defaultColumns={defaultColumns}
            loading={isClubsLoading}
            setLoading={() => {}} // 변경 필요
            selected={selected}
            setSelected={setSelected}
            dataSource2={dataSource2}
            setDataSource2={() => {}} // 변경 필요
            permission2={permission2}
            handleAdd2={handleAdd2}
            defaultColumns2={defaultColumns2}
            loading2={isAccountInfoLoading}
            setLoading2={() => {}} // 변경 필요
            selected2={selected2}
            setSelected2={setSelected2}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            currentPage2={currentPage2}
            setCurrentPage2={setCurrentPage2}
        />
    );
}