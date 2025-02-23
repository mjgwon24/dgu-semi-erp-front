import {useEffect, useState} from "react";
import BudgetPlanUI from "@/src/components/units/budgetPlan/BudgetPlan.presenter";
import dayjs from "dayjs";

export default function BudgetPlan() {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const lastMonthString = lastMonth.toISOString().split("T")[0];

    const [conditions, setConditions] = useState({
        expenseType: "운영비",
        clubName: "개발 동아리",
        paymentDate: {from: todayString, to: lastMonthString},
        status: "대기",
        content: "",
        draftDate: {from: todayString, to: lastMonthString},
        drafter: "",
        amount: {from: 0, to: 100000, maxNum: 100000}
    });

    const labels = {
        expenseType: "집행 유형",
        clubName: "동아리",
        paymentDate: "결제 예정일",
        status: "상태",
        content: "내용",
        draftDate: "기안일",
        drafter: "기안자",
        amount: "금액"
    };

    const orderKeys = [
        "expenseType",
        "clubName",
        "paymentDate",
        "status",
        "content",
        "draftDate",
        "drafter",
        "amount"
    ];

    const types = {
        expenseType: "select",
        clubName: "selectWithSearch",
        paymentDate: "rangeDate",
        status: "select",
        content: "text",
        draftDate: "rangeDate",
        drafter: "text",
        amount: "rangeNumber"
    }

    const options = {
        expenseType: ["운영비", "행사비", "소모품 구매"],
        status: ["대기", "승인", "반려"],
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
            width: '1%',
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

    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);

    // 데이터 요청 함수
    const fetchData = async () => {
        try{
            setLoading(true);
            // 임의의 API 호출(여기서 API 연결)
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const baseData = response.data;

            // 임의로 100개의 데이터 생성
            const data = Array.from({ length: 100 }, (_, index) => {
                const item = baseData[index % baseData.length]; // 데이터 순환
                return {
                    No: index + 1,
                    executionType: '소모품 구매',
                    clubName: '빅데이터 동아리',
                    content: '',
                    drafter: '',
                    draftDate: dayjs().add(index, 'day').format('YYYY-MM-DD'), // 날짜를 하루씩 증가
                    paymentDate: dayjs().add(index, 'day').format('YYYY-MM-DD'), // 날짜를 하루씩 증가
                    amount: 0,
                    status: ['대기', '승인', '반려'][index % 3],
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

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        fetchData();
    }, []);

    const permission1 = "admin";

    return <BudgetPlanUI
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
        />
}
