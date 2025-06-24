import ConditionBar from "@/src/components/common/layout/conditions/conditionbar";
import TableWrapper from "@/src/components/common/layout/table/tableWrapper";
import EditableTable from "@/src/components/common/layout/table/editableTable";
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
    accountInfo,
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
        <div className="flex h-full min-w-[1482px]">

                <div className="flex flex-col gap-7 p-5 w-full">
                    <ConditionBar
                        title={"통장 관리"}
                        conditions={conditions}
                        setConditions={setConditions}
                        labels={labels}
                        orderKeys={orderKeys}
                        options={options}
                        types={types}
                    />
                    <div className="flex flex-row gap-2 w-full">
                        <TableWrapper 
                            title="통장 조회"
                            subTitle={`${dataSource==undefined?0:dataSource.length}건`} 
                            hasAddButton={permission1=="admin"} 
                            handleAdd={handleAdd}
                            handleAddTitle={"추가"}
                            width="18%">
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
                                height={505}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                />
                        </TableWrapper>

                        {selected!=-1&&
                            <TableWrapper
                                title={`${dataSource[selected]?dataSource[selected].crew:""} 통장 내역 상세`} 
                                subTitle={`${setDataSource2==undefined?0:dataSource2.length}건`}
                                hasAddButton={permission2=="admin"} 
                                handleAdd={handleAdd2}
                                handleAddTitle={"통장 추가"}
                                width="82%"
                                height="600px">
                                <div className="flex flex-row gap-2 w-full">
                                    <div className="w-[20%] rounded-md bg-white border border-gray-300 h-[504px] overflow-hidden p-6">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col">
                                                <div>{selected2 != -1 ? "계좌번호" : ""}</div>
                                                <div>{selected2 != -1 && accountInfo
                                                    ? accountInfo.bankbookNumber : ""}</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div>{selected2 != -1 ? "개설일" : ""}</div>
                                                <div>{selected2 != -1 && accountInfo
                                                    ? accountInfo.createdAt : ""}</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div>{selected2 != -1 ? "소유주" : ""}</div>
                                                <div>{selected2 != -1 && accountInfo
                                                    ? accountInfo.owner : ""}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[80%] h-[513px]">
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
                                            height={505}
                                            currentPage={currentPage2}
                                            setCurrentPage={setCurrentPage2}
                                            />
                                    </div>
                                </div>
                            </TableWrapper>
                        }
                    </div>
                </div>
        </div>
    );
}