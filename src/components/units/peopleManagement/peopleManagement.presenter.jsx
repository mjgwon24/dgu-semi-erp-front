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
    count,
    permission1,
    handleAdd,
    defaultColumns,
    loading,
    setLoading,
    selected,
    setSelected,
    dataSource2,
    setDataSource2,
    count2,
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
        <div className="flex h-full w-full min-w-[1482px]">

                <div className="w-full flex flex-col gap-7 p-5">
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
                        <div className="w-[35%]">
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
                                        count={count}
                                        permission={permission1}
                                        selected={selected}
                                        setSelected={setSelected}
                                        width={"100%"}
                                        height={505}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        />
                                
                            </TableWrapper>
                        </div>

                        <div className="w-[63%]">
                            <TableWrapper 
                                title={`${dataSource[selected]?dataSource[selected].crew:""} 인원 조회 상세`}
                                subTitle={`${dataSource2.length}건`} 
                                hasAddButton={false} 
                                width={"100%"}>
                                <div className="w-full">
                                    <EditableTable
                                        dataSource={dataSource2}
                                        setDataSource={setDataSource2}
                                        defaultColumns={defaultColumns2}
                                        loading={loading2}
                                        setLoading={setLoading2}
                                        count={count2}
                                        permission={permission2}
                                        selected={selected2}
                                        setSelected={setSelected2}
                                        width={"100%"}
                                        height={505}
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