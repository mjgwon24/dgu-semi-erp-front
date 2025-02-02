import locale from 'antd/locale/ko_KR';
import React, { useEffect, useState } from 'react';
import { Table,Button } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import EditableCell from '../tableCell';
import HeaderCell from '../tableHeader';
import EditableRow from '../tableRow';

const EditableTable = ({dataSource, setDataSource,defaultColumns}) => {
// const App = ({ dataSource, setDataSource, columns, pagination, rowKey = "No" }) => {

//   const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(null);//불러오는 데이터 행의 개수(fetchData에서 설정됨)
    const [loading, setLoading] = useState(true);

    // 페이지네이션 현재 페이지
    const [currentPage,setCurrentPage] = useState(1);

    // 데이터 요청 함수
    const fetchData = async () => {
        try{
            setLoading(true);
            // 임의의 API 호출(여기서 API 연결)
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const baseData = response.data;
    
            // 임의로 100개의 데이터 생성
            const data = Array.from({ length: 100 }, (_, index) => {
                const item = baseData[index % baseData.length]; // 데이터 순환
                return {
                    No: index + 1,
                    how: '운영비',
                    crew: 'DEVELOPER',
                    content: `${item.name} - ${index + 1}`, // 고유한 이름 추가
                    person: item.username,
                    howpay: '카드',
                    date: dayjs().add(index, 'day').format('YYYY-MM-DD'), // 날짜를 하루씩 증가
                    amount: (18000 + index * 100).toString(), // 금액에 변동 추가
                    status: index % 2 === 0 ? '대기' : '완료', // 상태를 번갈아 표시
                    file: null,
                };
            });
  
            setDataSource(data);
            setCount(data.length);
        }
        catch(error){
            console.error('데이터 로딩 실패:', error);
        }
        finally{
            setLoading(false);
        }
    };
  

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        fetchData();
    }, []);

    // 행 추가 함수
    const handleAdd = () => {
        const newData = defaultColumns.reduce((acc, column) => {
            const { dataIndex, type } = column;
            if (type === 'text') acc[dataIndex] = '';
            else if (type === 'select') acc[dataIndex] = column.selects ? column.selects[0] : '';
            else if (type === 'date') acc[dataIndex] = dayjs().format('YYYY-MM-DD'); // 현재 날짜
            else if (type === 'file') acc[dataIndex] = null;
            else if (type === 'id') acc[dataIndex] = count + 1; // No 필드 자동 증가
            else if (type === 'money') acc[dataIndex] = 0; // No 필드 자동 증가
            else acc[dataIndex] = ''; // 나머지는 빈 문자열로 초기화
            return acc;
        }, {});
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    // 행 삭제 함수
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    
    // 행 변경사항 저장 함수
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.No === item.No);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
            No: item.No,
        });
        setDataSource(newData);
    };

    // <Table>에서 사용할 props 값 세팅
    const components = {
        header:{
            cell:HeaderCell
        },
        body: {
        row: EditableRow,
        cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                type: col.type,
                selects: col.selects,
                maxlength: col.maxlength,
                handleSave,
            }),
        };
    });

    const pageSize = 5; // 한 페이지당 항목 수
    const totalPages = Math.ceil(dataSource.length / pageSize); // 전체 페이지 수

    // 페이지네이션 버튼 생성 함수
    const generatePageButton = (page) => (
        <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${page==currentPage?'text-[#000000] font-bold':'text-[#5E5E5E]'} px-1`}
        >
        {page}
        </button>
    );

    // 페이지 전환 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 페이지네이션 생성 함수
    const renderPagination = (currentPage,totalPages) => {
        const pages = [];

        // 항상 첫 페이지와 마지막 페이지 표시
        const firstPage = 1;
        const lastPage = totalPages;
        // 처음으로 이동 버튼
        // pages.push(
        //     <button
        //     key="first"
        //     onClick={() => handlePageChange(1)}
        //     className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
        //     >
        //     &lt;&lt;
        //     </button>
        // );
    
        // 이전 버튼
        pages.push(
            <button
            key="prev"
            onClick={() => {handlePageChange((currentPage-2+totalPages)%totalPages+1)}}
            className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
            >
            &lt;
            </button>
        );
        // 페이지가 7개 이하일 경우 모두 표시
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(generatePageButton(i));
            }
            // "다음" 버튼 추가
            pages.push(
                <button
                key="next"
                onClick={() => {handlePageChange((currentPage%totalPages)+1)}}
                className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
                >
                    &gt;
                </button>
            );
        
            // 끝으로 이동 버튼
            // pages.push(
            //     <button
            //       key="last"
            //       onClick={() => handlePageChange(totalPages)}
            //       className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
            //     >
            //       &gt;&gt;
            //     </button>
            //   );
            return pages;
        }

        // 첫 페이지 추가
        pages.push(generatePageButton(firstPage));

        // 현재 페이지가 3 이상일 경우 앞 부분 생략 표시
        if (currentPage > 3) {
            pages.push(<span key="dots1" className='text-[#3A3A3A] py-2'>...</span>);
        }

        // 현재 페이지 기준으로 앞뒤 2개 페이지 표시
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(generatePageButton(i));
        }

        // 현재 페이지가 마지막에서 2개 이상 떨어져 있으면 뒷부분 생략 표시
        if (currentPage < totalPages - 2) {
            pages.push(<span key="dots2" className='text-[#3A3A3A] py-2'>...</span>);
        }

        // 마지막 페이지 버튼
        pages.push(generatePageButton(lastPage));
        // 다음 버튼
        pages.push(
            <button
            key="next"
            onClick={() => {handlePageChange((currentPage%totalPages)+1)}}
            className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
            >
            &gt;
            </button>
        );
  
        // 끝으로 이동 버튼
        //   pages.push(
        //     <button
        //       key="last"
        //       onClick={() => handlePageChange(totalPages)}
        //       className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
        //     >
        //       &gt;&gt;
        //     </button>
        //   );

    

        return pages;
    };
    return (
        <div className='flex flex-col gap-4'>
            {/* 행 추가 버튼 */}
            {/* <Button onClick={handleAdd} type="primary" className='mb-4'>행 추가</Button> */}
            <Table
                className='rounded-md bg-white border border-gray-300 min-h-[312px] max-h-[456px] overflow-hidden'
                components={components}
                rowClassName={() => 'editable-row'}
                bordered={false}
                dataSource={dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                columns={columns}
                pagination={false}
                rowKey="No"/>
            <div className='flex justify-center'>
                {/* <div className='flex '> */}
                <div className='flex justify-between w-[222px]'>
                    {renderPagination(currentPage,totalPages)} {/* 커스텀 페이지네이션 */}
                </div>
            </div>
        </div>
    );
};
// const StyledTable = styled(EditableTable)`
// `;

  

export default EditableTable;