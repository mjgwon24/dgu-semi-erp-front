import ConditionBar from "@/src/components/common/layout/conditions/conditionbar";
import TableWrapper from "@/src/components/common/layout/table/tableWrapper";
import EditableTable from "@/src/components/common/layout/table/editableTable";

export default function BudgetReportUI({ conditions, setConditions, labels, orderKeys, options, types, defaultColumns, dataSource, setDataSource, loading, setLoading, permission1, handleAdd }) {
    return (
        <div className="flex flex-col gap-7 border-t-[1px] border-solid border-black p-5">
            <ConditionBar
                title={"예산 보고서"}
                conditions={conditions}
                setConditions={setConditions}
                labels={labels}
                orderKeys={orderKeys}
                options={options}
                types={types}
            />

            <div>
                <TableWrapper
                    title="예산 보고서 조회"
                    subTitle={`${dataSource.length}건`}
                    handleAdd={handleAdd}
                    width="100%">
                    <EditableTable
                        dataSource={dataSource}
                        setDataSource={setDataSource}
                        defaultColumns={defaultColumns}
                        loading={loading}
                        setLoading={setLoading}
                        permission={permission1}
                        setSelected={() => { }}
                    />

                </TableWrapper>
            </div>
        </div>
    );
}