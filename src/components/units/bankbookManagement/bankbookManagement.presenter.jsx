import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";
import ConditionBar from "@/src/components/common/layout/conditions/conditionbar";
import TableWrapper from "@/src/components/common/layout/table/tableWrapper";
import EditableTable from "@/src/components/common/layout/table/editableTable";
import { useState,useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
export default function BankbookManagementUI({
    conditions,
    setConditions,
    labels,
    orderKeys,
    options,
    types,
    dataSource,
    setDataSource,
    permission1,
    handleAdd,
    defaultColumns,
    loading,
    setLoading,
    selected,
    setSelected,
    dataSource2,
    setDataSource2,
    permission2,
    handleAdd2,
    defaultColumns2,
    loading2,
    setLoading2,
    selected2,
    setSelected2,
}) {
    return (
        <div className="flex h-full bg-[#F7F7F7]">

                <div className="flex flex-col gap-7 border-t-[1px] border-solid border-black p-5">
                    <ConditionBar
                        title={"통장 관리"}
                        conditions={conditions}
                        setConditions={setConditions}
                        labels={labels}
                        orderKeys={orderKeys}
                        options={options}
                        types={types}
                    />
                    <div className="flex flex-row gap-2">
                        <TableWrapper 
                            title="통장 조회" 
                            subTitle={`${dataSource==undefined?0:dataSource.length}건`} 
                            hasAddButton={permission1=="admin"} 
                            handleAdd={handleAdd}
                            handleAddTitle={"추가"}
                            width="300px">
                            <EditableTable
                                dataSource={dataSource}
                                setDataSource={setDataSource}
                                defaultColumns={defaultColumns}
                                loading={loading}
                                setLoading={setLoading}
                                permission={permission1}
                                selected={selected}
                                setSelected={setSelected}
                                />
                            
                        </TableWrapper>
                        <TableWrapper
                            title={`${dataSource[selected].crew} 통장 내역 상세`} 
                            subTitle={`${setDataSource2==undefined?0:dataSource.length}건`} 
                            hasAddButton={permission2=="admin"} 
                            handleAdd={handleAdd2}
                            handleAddTitle={"통장 추가"}
                            width="1300px">
                            <div className="flex flex-row gap-2">
                                <div className="w-[330px] rounded-md bg-white border border-gray-300 h-[346px] overflow-hidden p-6">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col">
                                            <div>{selected2!=-1?"계좌번호":""}</div>
                                            <div>{selected2!=-1?dataSource2[selected2].bankbook.bankbookNumber:""}</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div>{selected2!=-1?"개설일":""}</div>
                                            <div>{selected2!=-1?dataSource2[selected2].bankbook.createdAt:""}</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div>{selected2!=-1?"소유주":""}</div>
                                            <div>{selected2!=-1?dataSource2[selected2].bankbook.owner:""}</div>
                                        </div>
                                    </div>
                                </div>
                                <EditableTable
                                    dataSource={dataSource2}
                                    setDataSource={setDataSource2}
                                    defaultColumns={defaultColumns2}
                                    loading={loading2}
                                    setLoading={setLoading2}
                                    permission={permission2}
                                    selected={selected2}
                                    setSelected={setSelected2}
                                    />
                            </div>
                            
                            
                        </TableWrapper>
                    </div>
        </div>
</div>
)
    ;
}