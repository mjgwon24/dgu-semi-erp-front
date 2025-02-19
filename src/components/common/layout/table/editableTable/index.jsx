import locale from 'antd/locale/ko_KR';
import React, { useEffect, useState } from 'react';
import { Table,Button } from 'antd';
import dayjs from 'dayjs';
import EditableCell from '../tableCell';
import HeaderCell from '../tableHeader';
import EditableRow from '../tableRow';
const EditableTable = ({dataSource, setDataSource,defaultColumns,loading,setLoading,selected,setSelected,permission}) => {
    // 페이지네이션 현재 페이지
    const [currentPage,setCurrentPage] = useState(1);
    const isAdmin = permission=="admin";
    // 행 추가 함수
    

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
            cell:HeaderCell,
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
                editable: isAdmin?col.editable:false,
                dataIndex: col.dataIndex,
                type: col.type,
                selects: col.selects,
                selectboxWidth: col.selectboxWidth,
                maxlength: col.maxlength,
                handleSave
            }),
        };
    });

    const [pageSize,setPageSize] = useState(5); // 한 페이지당 항목 수
    
    const onRowClick = (index)=>{
        setSelected(index);
    }
    const totalPages = dataSource&&dataSource.length!=0?Math.ceil(dataSource.length / pageSize):0; // 전체 페이지 수

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
        if(totalPages==0)
            return;
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
        <div className='flex flex-col gap-4 w-full'>
            {/* 행 추가 버튼 */}
            {/* <Button onClick={handleAdd} type="primary" className='mb-4'>행 추가</Button> */}
            <Table
                className={`rounded-md bg-white border border-gray-300 h-[346px] overflow-hidden`}
                components={components}
                rowClassName={() => 'editable-row cursor-pointer'}
                bordered={false}
                dataSource={dataSource?dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize):[]}
                columns={columns}
                pagination={false}
                rowKey="No"
                onRow={(record, rowIndex) => ({
                    record,
                    index:rowIndex,
                    onRowClick,
                    className: rowIndex==selected?"bg-gray-100 font-semibold":"",
                })}/>
            <div className='flex justify-center items-center'>
                <div className='flex gap-2'>
                    {renderPagination(currentPage,totalPages)} {/* 커스텀 페이지네이션 */}
                </div>
            </div>
        </div>
    );
};


  

export default EditableTable;