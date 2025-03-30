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
export default function PeopleManagementUI({
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
    currentPage,
    setCurrentPage,
    currentPage2,
    setCurrentPage2
}) {
    return (
        <div className="flex h-full bg-[#F7F7F7] w-full">

                <div className="w-full flex flex-col gap-7 border-t-[1px] border-solid border-black p-5">
                    <ConditionBar
                        title={"인원 관리"}
                        conditions={conditions}
                        setConditions={setConditions}
                        labels={labels}
                        orderKeys={orderKeys}
                        options={options}
                        types={types}
                    />
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-[34.3%]">
                            <TableWrapper 
                                title="인원 조회" 
                                subTitle={`${dataSource.length}건`} 
                                hasAddButton={permission1=="admin"} 
                                handleAdd={handleAdd}
                                handleAddTitle={"추가"}
                                width={"100%"}>
                                    <EditableTable
                                        dataSource={dataSource}
                                        setDataSource={setDataSource}
                                        defaultColumns={defaultColumns}
                                        loading={loading}
                                        setLoading={setLoading}
                                        permission={permission1}
                                        selected={selected}
                                        setSelected={setSelected}
                                        width={"100%"}
                                        height={513}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        />
                                
                            </TableWrapper>
                        </div>

                        <div className="w-[63%]">
                            <TableWrapper 
                                title={`${dataSource2[selected]?dataSource2[selected].crew:""} 인원 조회 상세`}
                                subTitle={`${dataSource2.length}건`} 
                                hasAddButton={permission2=="admin"} 
                                handleAdd={handleAdd2}
                                handleAddTitle={"통장 추가"}
                                width={"100%"}>
                                <div className="w-full">
                                    <EditableTable
                                        dataSource={dataSource2}
                                        setDataSource={setDataSource2}
                                        defaultColumns={defaultColumns2}
                                        loading={loading2}
                                        setLoading={setLoading2}
                                        permission={permission2}
                                        selected={selected2}
                                        setSelected={setSelected2}
                                        width={"100%"}
                                        height={513}
                                        currentPage={currentPage2}
                                        setCurrentPage={setCurrentPage2}
                                        />
                                </div>
                            </TableWrapper>
                        </div>
                    </div>
        </div>
</div>
)
    ;
}