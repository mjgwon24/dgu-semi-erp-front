import {useEffect, useState} from "react";
import BudgetPlanUI from "@/src/components/units/budgetPlan/BudgetPlan.presenter";
import dayjs from "dayjs";
import {useAccountClubs, useAccountInfo} from "@/src/hooks/useAccountInfo";
import {useBudgetPlanInfo, useBudgetUsageInfo, useBudgetReport} from "@/src/hooks/useBudgetPlanInfo";
import { useAllClubs } from "@/src/hooks/useClubInfo";

function mapBudgetPlansToDataSource(budgetPlans, currentPage, allClubs, pageSize = 8) {
    if (!Array.isArray(budgetPlans)) return [];
    return budgetPlans.map((budgetPlan, index) => ({
        No: (currentPage - 1) * pageSize + index + 1,
        executionType: budgetPlan.executeType,
        clubName: budgetPlan.clubName,
        paymentDate: budgetPlan.expectedPaymentDate.split("T")[0],
        status: budgetPlan.status=="HOLD"?"대기":budgetPlan.status=="REJECTED"?"반려":"승인",
        content: budgetPlan.content,
        draftDate: budgetPlan.createdAt.split("T")[0],
        drafter: budgetPlan.drafter,
        amount: budgetPlan.paymentAmount,
    }));
}

export default function BudgetPlan() {
    const { data: allClubsData, isLoading: isAllClubsLoading } = useAllClubs();
    const allClubs = allClubsData?.content || [];
    
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const lastMonthString = lastMonth.toISOString().split("T")[0];

    const [conditions, setConditions] = useState({
        executeType: "운영비",
        clubName: "전체",
        paymentDate: {from: lastMonthString, to: todayString},
        status: "대기",
        content: "",
        draftDate: {from: lastMonthString, to: todayString},
        drafter: "",
        amount: {from: 0, to: 100000, maxNum: 100000}
    });

    const labels = {
        executeType: "집행 유형",
        clubName: "동아리명",
        paymentDate: "결제 예정일",
        status: "상태",
        content: "내용",
        draftDate: "기안일",
        drafter: "기안자",
        amount: "금액"
    };

    const orderKeys = [
        "executeType",
        "clubName",
        "paymentDate",
        "status",
        "content",
        "draftDate",
        "drafter",
        "amount"
    ];

    const types = {
        executeType: "select",
        clubName: "selectWithSearch",
        paymentDate: "rangeDate",
        status: "select",
        content: "text",
        draftDate: "rangeDate",
        drafter: "text",
        amount: "rangeNumber"
    }


    const options = {
        executeType: ["운영비", "행사비", "소모품 구매"],
        status: ["대기", "승인", "반려"],
        clubName: ["전체", ...allClubs.map((c) => c.name)],
    }
    const [selected,setSelected] = useState(-1);    // 동아리 목록 선택 인덱스

    const [currentPage,setCurrentPage] = useState(1);

    const { data: budgetPlansData, isLoading: isBudgetPlansLoading } = useBudgetPlanInfo(currentPage - 1, 8,
        conditions.executeType,
        conditions.clubName,
        conditions.paymentDate,
        conditions.status,
        conditions.content,
        conditions.draftDate,
        conditions.drafter,
        conditions.amount
    );
    const budgetPlans = budgetPlansData?.content || [];
    const budgetPlansPaginationInfo = budgetPlansData?.paginationInfo || { totalElements: 0, totalPages: 1, currentPage: 0 };
    const budgetPlanTotalElements = budgetPlansData?.totalElements;
    const budgetPlanTotalPages = budgetPlansData?.totalPages;
    const dataSource = mapBudgetPlansToDataSource(budgetPlans, currentPage, allClubs);
    const selectedClubOrigin = dataSource[selected]?.origin;
    const budgetPlanId = selectedClubOrigin?.budgetPlanId ?? null;



    const defaultColumns = [
        {
            title: 'No',
            dataIndex: 'No',
            width: '1%',
            editable: false,
            type:'id'
        },
        {
            title: '집행유형',
            dataIndex: 'executionType',
            width: '5%',
            editable: true,
            type:'select',
            selects:['소모품 구매','운영비','행사비']
        },
        {
            title:'동아리',
            dataIndex: 'clubName',
            width: '5%',
            editable: true,
            type:'select',
            selects: allClubs.map(c => c.name)
        },
        {
            title:'내용',
            dataIndex: 'content',
            width: '15%',
            editable: true,
            type:'text',
            maxlength: 30
        },
        {
            title:'기안자',
            dataIndex: 'drafter',
            width: '5%',
            editable: true,
            type:'text',
            maxlength: 5
        },
        {
            title:'기안일',
            dataIndex: 'draftDate',
            width: '5%',
            editable: true,
            type:'date'
        },
        {
            title:'결제 예정일',
            dataIndex: 'paymentDate',
            width: '5%',
            editable: true,
            type:'date',
        },
        {
            title:'금액',
            dataIndex: 'amount',
            width: '5%',
            editable: true,
            type:'money',
            maxlength:10000000
        },
        {
            title:'상태',
            dataIndex: 'status',
            width: '1%',
            editable: true,
            type:'select',
            selects:['대기', '승인', '반려']
        }
    ];

    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleAdd = () => {
        const newData = defaultColumns.reduce((acc, column) => {
            const { dataIndex, type } = column;
            if (type === 'text') acc[dataIndex] = '';
            else if (type === 'select') acc[dataIndex] = column.selects ? column.selects[0] : '';
            else if (type === 'date') acc[dataIndex] = dayjs().format('YYYY-MM-DD'); // 현재 날짜
            else if (type === 'file') acc[dataIndex] = null;
            else if (type === 'id') acc[dataIndex] = count + 1; // No 필드 자동 증가
            else if (type === 'money') acc[dataIndex] = 0; // No 필드 자동 증가
            else acc[dataIndex] = ''; // 나머지는 빈 문자열로 초기화
            return acc;
        }, {});
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };    
    const permission1 = "admin";

    return (<BudgetPlanUI
        conditions={conditions}
        setConditions={setConditions}
        labels={labels}
        orderKeys={orderKeys}
        options={options}
        types={types}
        dataSource={dataSource}
        setDataSource={()=>{}}
        defaultColumns={defaultColumns}
        loading={loading}
        setLoading={setLoading}
        handleAdd={handleAdd}
        permission1={permission1}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={budgetPlanTotalPages}
        totalElements={budgetPlanTotalElements}
        />);
}
