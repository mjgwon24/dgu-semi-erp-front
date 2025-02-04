import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";
// import ConditionBar from "@/src/components/common/layout/conditions/conditionbar";

export default function BudgetPlanUI() {
    return (
        <div className="flex h-screen">
            <div className="w-[12%]">
                <SideBarLayout/>
            </div>
            <div className="flex flex-col border-l-[1px] border-solid border-black">
                <div className="flex h-[10%]">
                    <HeaderLayout/>
                </div>
                <div className="flex flex-col gap-7 border-t-[1px] border-solid border-black p-5">
                    {/*<ConditionBar*/}
                    {/*    title={"예산 계획"}*/}
                    {/*    conditions={conditions}*/}
                    {/*    setConditions={setConditions}*/}
                    {/*    labels={labels}*/}
                    {/*    orderKeys={orderKeys}*/}
                    {/*    options={options}*/}
                    {/*    types={types}*/}
                    {/*/>*/}

                    <div>
                        테이블 영역
                    </div>
                </div>
            </div>
        </div>
    )
}