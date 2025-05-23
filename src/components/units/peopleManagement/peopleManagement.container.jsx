import PeopleManagementUI from "./peopleManagement.presenter";
import { useState,useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { responsiveArray } from "antd/es/_util/responsiveObserver";

dayjs.locale('zh-cn');
export default function PeopleManagementPage() {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const lastMonthString = lastMonth.toISOString().split("T")[0];
    const permission1 = "notadmin";
    const permission2 = "admin";
    const defaultColumns = [
        {
          title: 'No',
          dataIndex: 'No',
          width: '14%',
          editable: false,
          type:'id'
        },
        {
            title: '동아리',
            dataIndex: 'crew',
            width: '20%',
            editable: true,
            type:'select',
            selectboxWidth:'10px',
            selects:['컴퓨터공학과','전자정보통신학과','기계시스템공학과']
          },
          {
            title:'활동 인원',
            dataIndex: 'currentPeople',
            width: '20%',
            editable: true,
            type:'money',
            maxlength:7
        },
        {
            title:'누적 인원',
            dataIndex: 'totalPeople',
            width: '20%',
            editable: true,
            type:'money',
            maxlength:7
        },
        {
            title:'상태',
            dataIndex: 'status',
            width: '15%',
            editable: true,
            type:'select',
            selectboxWidth:'10px',
            selects:['활동중','수료']
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
            const response = await axios.get('http://localhost:8081/user/me/club?page='+(currentPage-1)+'&size=8', {
                withCredentials: true,
              });
            const baseData = response.data.content;
            console.log(response.data);
            const data = baseData.map((item,index)=>{
                return {
                    No: (currentPage-1)*8 + index + 1,
                    crew: item.name,
                    currentPeople: item.clubMembers.filter((data) => data.status=="ACTIVE").length,
                    totalPeople: item.clubMembers.length.toString(),
                    status: item.status === 'ACTIVE' ? '활동중' : '활동중지',
                    clubId: item.id
                };
            })

            setClubNames(baseData.map((item,index)=>{
                return item.name;
            }))
  
            setDataSource(data);
            console.log(response.data.paginationInfo.totalElements);
            setCount(response.data.paginationInfo.totalElements);
            
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
          width: '5%',
          editable: false,
          type:'id'
        },
        {
            title:'이름',
            dataIndex: 'person',
            width: '6%', 
            editable: true,
            type:'text',
            maxlength:5
        },
        {
            title: '학과',
            dataIndex: 'crew',
            width: '12%',
            editable: true,
            type:'select',
            selectboxWidth:'135px',
            selects:['컴퓨터공학과','전자정보통신학과','기계시스템공학과']
          },
          {
            title:'학번',
            dataIndex: 'grade',
            width: '9%',
            editable: true,
            type:'number',
            maxlength:10
        },
        {
          title: '역할',
          dataIndex: 'how',
          width: '9%',
          editable: true,
          type:'select',
          selectboxWidth:'80px',
          selects:['회장','팀장','부원']
    
        },
        {
            title:'가입일',
            dataIndex: 'date',
            width: '10%',
            editable: true,
            type:'date'
        },
        {
            title:'상태',
            dataIndex: 'status',
            width: '7%',
            editable: true,
            type:'select',
            selectboxWidth:'80px',
            selects:['활동중','수료']
        }
      ];
    const [dataSource2, setDataSource2] = useState([]);
    const [count2, setCount2] = useState(null);
    const [loading2, setLoading2] = useState(true);
    const [currentPage,setCurrentPage] = useState(1);
    const [currentPage2,setCurrentPage2] = useState(1);
    const fetchData2 = async () => {
        try{
            setLoading2(true);
            const clubId = dataSource[selected].clubId;
            const response = await axios.get("http://localhost:8081/club/member?clubId="+clubId.toString()+"&status=ACTIVE&page="+(currentPage2-1)+"&size=8");
            const baseData = response.data;
            const data = baseData.content.map((item, index)=>{
                return {
                        No: (currentPage2-1)*8 + index + 1,
                        person: item.name,
                        crew: item.major,
                        grade: item.studentNumber.toString(),
                        how: item.role=='MEMBER'?"일반 회원":item.role=="LEADER"?"회장":item.role=="VICE_LEADER"?"부회장":"총무",
                        date: item.joinedAt.split("T")[0],
                        status: item.status=="ACTIVE"?"활동중":item.status=="INACTIVE"?"수료":"정지",
                }
            })
  
            setDataSource2(data);
            setCount2(response.data.paginationInfo.totalElements);
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
        status: "대기",
        currentPeoples: {from: 0, to: 5000000},
        totalPeoples: {from: 0, to: 5000000},
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
    }

    
    const [clubNames,setClubNames] = useState(["빅데이터 동아리", "머신러닝 동아리", "개발 동아리"]);
    const [selected,setSelected] = useState(-1);
    const [selected2,setSelected2] = useState(-1);
    const options = {
        status: ["대기","활동중", "활동중지"],
        clubName: clubNames
    }
    useEffect(() => {
        fetchData();
        fetchData2();
    }, []);
    useEffect(()=>{
        fetchData2();
        setSelected2(0);
        setCurrentPage2(1);
    },[selected])
    useEffect(()=>{
        fetchData();
        fetchData2();
        setSelected2(0);
    },[currentPage])

    useEffect(()=>{
        fetchData2();
        setSelected2(0);
    },[currentPage2])
    return (
        <PeopleManagementUI conditions={conditions}
        setConditions={setConditions}
        labels={labels}
        orderKeys={orderKeys}
        options={options}
        types={types}
        dataSource={dataSource}
        setDataSource={setDataSource}
        count={count}
        permission1={permission1}
        handleAdd={handleAdd}
        defaultColumns={defaultColumns}
        loading={loading}
        setLoading={setLoading}
        selected={selected}
        setSelected={setSelected}
        dataSource2={dataSource2}
        setDataSource2={setDataSource2}
        count2={count2}
        permission2={permission2}
        handleAdd2={handleAdd2}
        defaultColumns2={defaultColumns2}
        loading2={loading2}
        setLoading2={setLoading2}
        selected2={selected2}
        setSelected2={setSelected2}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentPage2={currentPage2}
        setCurrentPage2={setCurrentPage2}/>
)
    ;
}