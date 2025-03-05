import BankbookManagementUI from "./bankbookManagement.presenter";
import { useState,useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
export default function BankbookManagementPage() {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const lastMonthString = lastMonth.toISOString().split("T")[0];
    const permission1 = "notadmin";
    const permission2 = "admin";
    const [selected,setSelected] = useState(-1);
    const [selected2,setSelected2] = useState(-1);
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
    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);
    // 데이터 요청 함수
    const fetchData = async () => {
        console.log("fetchData");
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
                    crew: 'DEVELOPERDEVELOPERDEVELOPERDEVELOPERDEVELOPERDEVELOPERDEVELOPER'+index
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
            else if (type === 'number') acc[dataIndex] = 0;
            else acc[dataIndex] = '';
            return acc;
        }, {});
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };
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
            maxlength:15
        },
        {
          title: '금액',
          dataIndex: 'amount',
          width: '10%',
          editable: true,
          type:'money',
    
        },
        {
            title:'남은 금액',
            dataIndex: 'restAmount',
            width: '10%',
            editable: true,
            type:'money'
        }
      ];
    const [dataSource2, setDataSource2] = useState(dataSource[selected]);
    const [count2, setCount2] = useState(null);
    const [loading2, setLoading2] = useState(true);
    const fetchData2 = async () => {
        console.log("fetchData2");
        try{
            setLoading2(true);
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const baseData = response.data;
            const data = Array.from({ length: 100 }, (_, index) => {
                const item = baseData[index % baseData.length];
                return {
                    No: index + 1,
                    tradetype: '입금',
                    content: '활동 지원비',
                    amount: `${index * 1000}`,
                    restAmount: `${index * 1000}`,
                    bankbook:{
                        'bankbookNumber':"1521564556"+dataSource&&dataSource[selected]?dataSource[selected].No:"",
                        'createdAt':'2021.12.21'+index,
                        'owner':'홍길동'+index
                    }
                };
            });
  
            setDataSource2(data);
            setCount2(data.length);
        }
        catch(error){
            console.error('데이터 로딩 실패:', error);
        }
        finally{
            setLoading2(false);
        }
    };
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
    const [conditions, setConditions] = useState({
        clubName: "개발 동아리",
        currentPeoples: {from: todayString, to: lastMonthString},
        status: "대기",
        totalPeoples: {from: todayString, to: lastMonthString},
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
        currentPeoples:"rangeDate",
        totalPeoples:"rangeDate"
    }

    const options = {
        status: ["모집중", "마감"],
        clubName: ["빅데이터 동아리", "머신러닝 동아리", "개발 동아리"]
    }

    useEffect(()=>{
        fetchData2().then(()=>{
            setSelected2(0);
        });
    },[selected])
    useEffect(() => {
        fetchData2();
        fetchData().then(()=>{
            setSelected(0);
            console.log(dataSource);
        });
    }, []);
    

    return (
        <BankbookManagementUI conditions={conditions}
        setConditions={setConditions}
        labels={labels}
        orderKeys={orderKeys}
        options={options}
        types={types}
        dataSource={dataSource}
        setDataSource={setDataSource}
        permission1={permission1}
        handleAdd={handleAdd}
        defaultColumns={defaultColumns}
        loading={loading}
        setLoading={setLoading}
        selected={selected}
        setSelected={setSelected}
        dataSource2={dataSource2}
        setDataSource2={setDataSource2}
        permission2={permission2}
        handleAdd2={handleAdd2}
        defaultColumns2={defaultColumns2}
        loading2={loading2}
        setLoading2={setLoading2}
        selected2={selected2}
        setSelected2={setSelected2}
        />
)
    ;
}