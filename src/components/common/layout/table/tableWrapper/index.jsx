import { Button } from 'antd';
function TableWrapper({ title,subTitle,hasAddButton,handleAdd, children }) {
    return (
        <div className="flex flex-col px-[30px] gap-2">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-1">
                    <p className="font-semibold text-[18px]">{title}</p>
                    <p className="font-medium text-[16px] text-[#3A3A3A] leading-[30px]">{subTitle}</p>
                </div>
                {hasAddButton&&<Button onClick={handleAdd} type="primary">행 추가</Button>}
            </div>
            {children}
        </div>
    );
}
export default TableWrapper;