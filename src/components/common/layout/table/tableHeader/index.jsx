// 테이블 헤더 컴포넌트
const HeaderCell = (props) => {
    const { children, ...restProps } = props;
    return (
        <th
        {...restProps}
        // className="bg-[#FFFFFF] text-[#1F1F1F] font-bold text-center border-b-2 border-[#D9D9D9]"
        style={{
          backgroundColor: '#FFFFFF',
          color: '#1f1f1f',
          fontWeight: 'bold',
          textAlign: 'center',
          borderBottom: '2px solid #d9d9d9',
        }}// 헤더 스타일 지정
        >
            {children}
        </th>
    );
};
export default HeaderCell;