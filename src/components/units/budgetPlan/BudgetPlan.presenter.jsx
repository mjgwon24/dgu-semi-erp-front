import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";
import ConditionBar from "@/src/components/common/layout/conditions/conditionbar";
import TableWrapper from "@/src/components/common/layout/table/tableWrapper";
import EditableTable from "@/src/components/common/layout/table/editableTable";
import {useEffect, useState} from "react";

export default function BudgetPlanUI({ conditions, setConditions, labels, orderKeys, options, types, defaultColumns, dataSource, setDataSource, loading, setLoading, permission1, handleAdd, currentPage, setCurrentPage, totalPages, totalElements}) {
    return (
        <div className="flex flex-col gap-7 p-5">
            <ConditionBar
                title={"예산 계획"}
                conditions={conditions}
                setConditions={setConditions}
                labels={labels}
                orderKeys={orderKeys}
                options={options}
                types={types}
            />

            <div>
                <TableWrapper
                    title="예산 계획 현황 조회"
                    subTitle={`${dataSource.length}건`}
                    hasAddButton={permission1 == "admin"}
                    handleAddTitle="등록"
                    handleAdd={handleAdd}
                    width="100%">
                    <EditableTable
                        dataSource={dataSource}
                        setDataSource={setDataSource}
                        defaultColumns={defaultColumns}
                        loading={loading}
                        setLoading={setLoading}
                        permission={permission1}
                        setSelected={() => {}}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        totalElements={totalElements}
                    />

                </TableWrapper>
            </div>
        </div>
    )
}