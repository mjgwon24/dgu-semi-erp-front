import MyPageUI from "@/src/components/units/MyPage/MyPage.presenter";
import { useState,useEffect } from "react";
import axios from 'axios';
export default function Main() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dataSource, setDataSource] = useState([]);
    const defaultColumns = [
        {
          title: 'No',
          dataIndex: 'No',
          width: '5%',
          editable: false,
          type:'id'
        },
        {
            title: '동아리',
            dataIndex: 'crew',
            width: '50%',
            editable: true,
            type:'select',
            selects:['컴퓨터공학과','전자정보통신학과','기계시스템공학과'],
            selectboxWidth:"300px"
          },
          {
            title: '직위',
            dataIndex: 'role',
            width: '20%',
            editable: true,
            type:'select',
            selects:['회장','부회장','운영진','PM','TPM','부원'],
            selectboxWidth:"100px"
          },
          {
            title: '',
            dataIndex: 'accept',
            width: '20%',
            editable: true,
            type:'accept',
            PositiveTitle:"변경 요청",
            NagativeTitle:"탈퇴"
          }
      ];
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
                    crew: 'DEVELOPER',
                    role:'',
                    accept:""
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
    
    const handleAdd = ()=>{}
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(0);
    const permission = "admin";

    useEffect(()=>{
        fetchData();
    },[])
    
    return <MyPageUI name={name} setName={setName} email={email} setEmail={setEmail} dataSource={dataSource} 
    setDataSource={setDataSource} 
    defaultColumns={defaultColumns} 
    handleAdd={handleAdd} 
    loading={loading} 
    setLoading={setLoading} 
    permission={permission} 
    selected={selected} 
    setSelected={setSelected}/>
}