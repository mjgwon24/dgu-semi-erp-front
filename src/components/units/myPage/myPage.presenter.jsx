import Main from "@/src/components/units/main/Main.container";
import dayjs from "dayjs";
import ConditionBar from "@/src/components/common/layout/conditions/conditionbar";
import TableWrapper from "@/src/components/common/layout/table/tableWrapper";
import EditableTable from "@/src/components/common/layout/table/editableTable";
import { Select, DatePicker, Input, InputNumber,Button } from 'antd';

export default function MyPageUI({name,setName,email,setEmail,dataSource,
    setDataSource,
    defaultColumns,
    handleAdd,
    loading,
    setLoading,
    permission,
    selected,
    setSelected}) {
    
    return (
        <div className="flex flex-row h-full gap-4 w-full flex-grow-0">
            {/*최근 공지사항*/}
            <div className="flex flex-col p-8 gap-4 flex-grow-0 rounded w-full">
                <div className="font-semibold text-[18px]">내 정보</div>
                <div className="flex flex-col border border-[#DBDBDB] rounded-lg p-7 bg-white gap-5 w-[100%]">
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-col justify-center w-24">이름</div>
                        <div className="w-[200px]">
                            <Input placeholder="홍길동" value={name} onChange={(e)=>{console.log(setName)}}/>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-col justify-center w-24">이메일</div>
                        <div className="w-[200px]">
                            <Input placeholder="example@naver.com" value={email} onChange={(e)=>{setEmail(e.target.value);}}/>
                        </div>
                        <Button type="primary" className="px-6">변경</Button>
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <TableWrapper 
                        title="소속 동아리" 
                        subTitle={`${dataSource==undefined?0:dataSource.length}개`} 
                        hasAddButton={permission=="admin"} 
                        handleAdd={handleAdd}
                        handleAddTitle={"추가"}
                        width="100%">
                        <div className="w-[93vw]">
                            <EditableTable
                                dataSource={dataSource}
                                setDataSource={setDataSource}
                                defaultColumns={defaultColumns}
                                loading={loading}
                                setLoading={setLoading}
                                permission={permission}
                                selected={selected}
                                setSelected={setSelected}
                                width={"100%"}
                                height={513}
                                />
                        </div>
                        
                    </TableWrapper>
                </div>
                
            </div>
         </div>
        
    )
}