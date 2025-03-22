import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import locale from 'antd/locale/ko_KR';
import { Table,Button } from 'antd';
import dayjs from 'dayjs';
import EditableCell from '../tableCell';
import HeaderCell from '../tableHeader';
import EditableRow from '../tableRow';
import { Empty } from "antd";
const EditableTable = ({dataSource, setDataSource,defaultColumns,loading,setLoading,selected,setSelected,permission,width,height,  onRowDoubleClick}) => {

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const lastMonthString = lastMonth.toISOString().split("T")[0];
    
    const isAdmin = permission=="admin";
    
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
                    club: 'DEVELOPERdddddddddddddddddDEVELOPERddddddddddddddddd'
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
    
   



    
  const tableRef = useRef(null);
  const [scrollConfig, setScrollConfig] = useState({
    x: "100%",
    y: 400,
  });

  const checkScroll = () => {
    if (tableRef.current) {
      Array.from(document.getElementsByClassName('ant-table-body')).forEach((tableBody)=>{
          if (tableBody) {
            console.log(tableBody);
            const parentHeight = height;
            const tableHeight = tableBody.scrollHeight;
    
            setScrollConfig((prev) => {
                const newScrollY = tableHeight <= parentHeight ? parentHeight - 50 : null;
                if (prev.y !== newScrollY) {
                    return { ...prev, y: newScrollY };
                }
                return prev;
            });
          }
          else{
            console.log(tableBody);
          }
      })
    }
  };

  
  const components = {
    header:{
        cell:HeaderCell,
    },
    body: {
    row: EditableRow,
    cell: EditableCell,
    },
};
const onRowClick = (index)=>{
    setSelected(index);
}
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


const [currentPage,setCurrentPage] = useState(1);
const [pageSize,setPageSize] = useState(8); // 한 페이지당 항목 수
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
            handleSave: handleSave,
            PositiveTitle: col.PositiveTitle,
            NagativeTitle: col.NagativeTitle,
            handlePositive: col.handlePositive,
            handleNagative: col.handleNagative,
        }),
    };
});


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
useEffect(() => {
    setTimeout(()=>{
        setScrollConfig({
            y: height
          });
    },10)
    
  }, [height]);
  useEffect(() => {
    const handleResize = () => {
        setTimeout(() => checkScroll(), 0);
    };

    // 초기 체크
    handleResize();

    // 창 크기 변경 이벤트 추가
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, [height, dataSource]);
  useEffect(() => {
    setTimeout(()=>{
        Array.from(document.getElementsByClassName("ant-table-body")).forEach(element => {
            element.style.maxHeight = `${height-64}px`
            element.style.height = `${height-64}px`
        });
        Array.from(document.getElementsByClassName("ant-table-wrapper")).forEach(element => {
            element.classList.add('rounded-md');
            element.classList.add('bg-white');
            element.classList.add('border');
            element.classList.add('border-gray-300');
        });
        
        
    },100)
    
}, [selected]);
useEffect(()=>{
    setSelected(0);
},[currentPage]);
  return (
    <div className={`flex flex-col w-full max-w-[${width}] rounded-md`}>
        <div className={`h-[${height-20}px] overflow-hidden rounded-md bg-none`}>
            <div ref={tableRef} className={"w-full overflow-hidden rounded-md bg-none"}>
                <Table
                className={`rounded-md bg-white border border-gray-300 h-[${height-20}px]`}
                columns={columns}
                dataSource={dataSource?dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize):[]}
                components={components}
                bordered={false}
                pagination={false}
                rowKey="No"
                scroll={scrollConfig}
                onRow={(record, rowIndex) => ({
                    onClick: () => onRowClick(rowIndex),
                    onDoubleClick: () => {
                        if (onRowDoubleClick) {
                            onRowDoubleClick(record);
                        }
                    },
                    className: rowIndex==selected?"bg-gray-100 font-semibold text-center":"text-center",
                })}
                locale={{
                    emptyText: (
                        <div className="flex flex-col items-center justify-center text-gray-400 h-[450px]">
                            <Empty description={"현재 조회된 데이터가 없습니다."}/>
                        </div>
                    ),
                }}
                />
            </div>
        </div>
        <div className="w-full flex flex-row justify-center">{renderPagination(currentPage,totalPages)}</div>
    </div>
            

    
  );
};

export default EditableTable;
