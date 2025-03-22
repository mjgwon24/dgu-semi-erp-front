import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import locale from 'antd/locale/ko_KR';
import { Table,Button } from 'antd';
import dayjs from 'dayjs';
import EditableCell from '../tableCell';
import HeaderCell from '../tableHeader';
import EditableRow from '../tableRow';
import { Empty } from "antd";
import { renderPagination } from "@/src/components/common/layout/table/pagination";
const EditableTable = ({dataSource, setDataSource,defaultColumns,loading,setLoading,selected,setSelected,currentPage,setCurrentPage,permission,width,height}) => {
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
                    record,
                    index:rowIndex,
                    onRowClick:onRowClick,
                    className: rowIndex==selected?"bg-gray-100 font-semibold text-center":"text-center",
                })}
                locale={{
                    emptyText: (
                        <div className={`flex flex-col items-center justify-center text-gray-400 h-[418px]`}>
                            <Empty description={"현재 조회된 데이터가 없습니다."}/>
                        </div>
                    ),
                }}
                />
            </div>
        </div>
        <div className="w-full flex flex-row justify-center">{renderPagination(currentPage,totalPages,handlePageChange)}</div>
    </div>
            

    
  );
};

export default EditableTable;
