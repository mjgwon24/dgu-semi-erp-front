import SideBarLayout from "@/src/components/common/layout/sidebar";
import HeaderLayout from "@/src/components/common/layout/header";
import ConditionBar from "@/src/components/common/layout/conditions/conditionbar";
import TableArea from "@/src/components/common/layout/tableArea";
import {useState} from "react";

export default function SamplePage() {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const lastMonthString = lastMonth.toISOString().split("T")[0];

    const [conditions, setConditions] = useState({
        expenseType: "운영비",
        clubName: "개발 동아리",
        paymentDate: {from: todayString, to: lastMonthString},
        status: "대기",
        content: "",
        draftDate: {from: todayString, to: lastMonthString},
        drafter: "",
        amount: {from: 0, to: 5000000}
    });

    const labels = {
        expenseType: "집행 유형",
        clubName: "동아리명",
        paymentDate: "결제 예정일",
        status: "상태",
        content: "내용",
        draftDate: "기안일",
        drafter: "기안자",
        amount: "금액"
    };

    const orderKeys = [
        "expenseType",
        "clubName",
        "paymentDate",
        "status",
        "content",
        "draftDate",
        "drafter",
        "amount"
    ];

    const types = {
        expenseType: "select",
        clubName: "selectWithSearch",
        paymentDate: "rangeDate",
        status: "select",
        content: "text",
        draftDate: "rangeDate",
        drafter: "text",
        amount: "number"
    }

    const options = {
        expenseType: ["운영비", "행사비", "소모품 구매"],
        status: ["대기", "승인", "반려"],
        clubName: ["빅데이터 동아리", "머신러닝 동아리", "개발 동아리"]
    }




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
                        테이블 영역
                    </div>
                </div>
        </div>
</div>
)
    ;
}