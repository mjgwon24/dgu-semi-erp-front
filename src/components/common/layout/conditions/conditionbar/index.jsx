import ConditionPanel from "@/src/components/common/layout/conditions/conditionPanel";

export default function ConditionBar(props) {
    const {
        title,
        conditions,
        setConditions,
        labels,
        orderKeys,
        options,
        types
    } = props;

    // 조건 변경 핸들러
    const handleConditionChange = (id, value) => {
        setConditions((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // 조회 버튼 클릭 핸들러
    const handleSearch = () => {
        console.log(`Search: ${JSON.stringify(conditions)}`);
    };

    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="text-xl weight-700">{title}</h3>
            </div>

            <div className="border border-solid border-[#DBDBDB] rounded-md pl-1 pr-3 py-2">
                <ConditionPanel
                    conditions={conditions}
                    onConditionChange={handleConditionChange}
                    onSearch={handleSearch}
                    labels={labels}
                    orderKeys={orderKeys}
                    options={options}
                    types={types}
                />
            </div>
        </div>
    );
}