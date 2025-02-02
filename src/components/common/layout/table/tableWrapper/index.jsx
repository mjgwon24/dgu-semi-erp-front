function TableWrapper({ title,subTitle, children }) {
    return (
        <div className="flex flex-col gap-[18px] px-[30px]">
            <div className="flex flex-row gap-1">
                <p className="font-semibold text-[18px]">{title}</p>
                <p className="font-medium text-[16px] text-[#3A3A3A] leading-[30px]">{subTitle}</p>
            </div>
            {children}
        </div>
    );
}
export default TableWrapper;