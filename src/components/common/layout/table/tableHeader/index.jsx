// 테이블 헤더 컴포넌트
const HeaderCell = (props) => {
    const { children, ...restProps } = props;
    return (
        <th
        {...restProps}
        className={"ant-table-cell !break-words !bg-[#FFFFFF] !text-[#1F1F1F] !font-bold !text-center !py-[16px] !px-[29px]"}
        >
            {children}
        </th>
    );
};
export default HeaderCell;