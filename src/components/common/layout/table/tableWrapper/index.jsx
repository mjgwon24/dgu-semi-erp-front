import { Button } from 'antd';
function TableWrapper({ title,subTitle,width,hasAddButton,handleAdd,handleAddTitle, children }) {
    return (
        <div className={`flex flex-col gap-2`} style={{width:width}}>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-1 py-[1px]">
                    <p className="font-semibold text-[18px]">{title}</p>
                    <p className="font-medium text-[16px] text-[#3A3A3A] leading-[30px]">{subTitle}</p>
                </div>
                {hasAddButton&&<Button onClick={handleAdd} type="primary" className='bg-[#4368BA]'>{handleAddTitle}</Button>}
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
export default TableWrapper;