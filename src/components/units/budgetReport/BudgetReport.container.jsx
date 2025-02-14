import BudgetUsageUI from "@/src/components/units/budgetReport/BudgetReport.presenter";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import axios from "axios";

export default function BudgetReport() {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const lastMonthString = lastMonth.toISOString().split("T")[0];

    const [conditions, setConditions] = useState({
        expenseType: "운영비",
        clubName: "개발 동아리",
        writingDate: {from: lastMonthString, to: todayString},
        drafter: "",
        content: "",
        usedBudget: {from: 0, to: 5000000},
        remainingBudget: {from: 0, to: 5000000}
    });

    const labels = {
        expenseType: "집행 유형",
        clubName: "동아리",
        writingDate: "작성일",
        drafter: "기안자",
        content: "내용",
        usedBudget: "사용 예산",
        remainingBudget: "잔여 예산",
    };

    const orderKeys = [
        "expenseType",
        "clubName",
        "writingDate",
        "drafter",
        "content",
        "usedBudget",
        "remainingBudget"
    ];

    const types = {
        expenseType: "select",
        clubName: "selectWithSearch",
        writingDate: "rangeDate",
        drafter: "text",
        content: "text",
        usedBudget: "number",
        remainingBudget: "number",
    }

    const options = {
        expenseType: ["운영비", "행사비", "소모품 구매"],
        clubName: ["빅데이터 동아리", "머신러닝 동아리", "개발 동아리"]
    }

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
            selects: ['빅데이터 동아리', '머신러닝 동아리', '개발 동아리']
        },
        {
            title:'내용',
            dataIndex: 'content',
            width: '12%',
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
            title:'작성일',
            dataIndex: 'writingDate',
            width: '5%',
            editable: true,
            type:'date',
        },
        {
            title:'사용 예산',
            dataIndex: 'usedBudget',
            width: '1%',
            editable: true,
            type:'money',
            maxlength:10000000
        },
        {
            title:'잔여 예산',
            dataIndex: 'remainingBudget',
            width: '1%',
            editable: true,
            type:'money',
            maxlength:10000000
        }
    ];

    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);

    // 데이터 요청 함수 - 백엔드 개발 후 대체 필요
    const fetchData = async () => {
        try{
            setLoading(true);
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const baseData = response.data;

            const data = Array.from({ length: 100 }, (_, index) => {
                const item = baseData[index % baseData.length];
                return {
                    No: index + 1,
                    executionType: '소모품 구매',
                    clubName: '빅데이터 동아리',
                    content: '',
                    drafter: '',
                    writingDate: dayjs().add(index, 'day').format('YYYY-MM-DD'),
                    usedBudget: 0,
                    remainingBudget: 0,
                };
            });

            setDataSource(data);
            setCount(data.length);
        }
        catch(error){
            console.error('데이터 로딩 실패:', error);
        }
        finally{
            setLoading(false);
        }
    };

    const handleAdd = () => {
        const newData = defaultColumns.reduce((acc, column) => {
            const { dataIndex, type } = column;
            if (type === 'text') acc[dataIndex] = '';
            else if (type === 'select') acc[dataIndex] = column.selects ? column.selects[0] : '';
            else if (type === 'date') acc[dataIndex] = dayjs().format('YYYY-MM-DD');
            else if (type === 'file') acc[dataIndex] = null;
            else if (type === 'id') acc[dataIndex] = count + 1;
            else if (type === 'money') acc[dataIndex] = 0;
            else acc[dataIndex] = '';
            return acc;
        }, {});
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        fetchData();
    }, []);

    const permission1 = "admin";

    return <BudgetUsageUI
        conditions={conditions}
        setConditions={setConditions}
        labels={labels}
        orderKeys={orderKeys}
        options={options}
        types={types}
        dataSource={dataSource}
        setDataSource={setDataSource}
        defaultColumns={defaultColumns}
        loading={loading}
        setLoading={setLoading}
        handleAdd={handleAdd}
        permission1={permission1}
    />;
}