import locale from 'antd/locale/ko_KR';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, DatePicker,Space, Select } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
  
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
const EditableCell = ({
    title,
    editable,
    type,
    maxlength,
    dataIndex,
    record,
    selects,
    handleSave,
    children,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
  
    useEffect(()=>{
        if(editing){
            inputRef.current?.focus();
        }
    }, [editing]);
  
    const toggleEdit = ()=>{
        setEditing(!editing);
        if(dataIndex!=="date"){
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        }
        else{
            form.setFieldsValue({
                [dataIndex]: record[dataIndex] ? dayjs(record[dataIndex], 'YYYY-MM-DD') : null,
            });
        }
    };
  
    const save = async ()=>{
        try{
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        }
        catch(errInfo){
            console.log('Save failed:', errInfo);
        }
    };
  
    let childNode = children;
  
    if(editable){
        if(type === 'date'&&dayjs(record[dataIndex], 'YYYY-MM-DD').isValid()){
            const datePickerRef = useRef(null);
            const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

            // 외부 클릭 감지
            const handleClickOutside = (event)=>{
                // 달력 패널 클릭은 무시
                if(datePickerRef.current&&!datePickerRef.current.contains(event.target)&&!event.target.closest('.ant-picker-dropdown')){ 
                    toggleEdit();
                }
            };

            // 클릭 이벤트 감지 추가
            useEffect(()=>{
                if(editing && !isDatePickerOpen){
                    document.addEventListener('mousedown', handleClickOutside);
                }
                else{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
                return ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                };
            }, [editing, isDatePickerOpen]);
            childNode = editing ? (
            <Form.Item name={dataIndex} className="m-0">
                <div ref={datePickerRef}>
                    <DatePicker
                        value={record[dataIndex] ? dayjs(record[dataIndex], 'YYYY-MM-DD') : null}
                        format="YYYY-MM-DD"
                        onChange={(date, dateString) => {
                            const formattedDate = dayjs(dateString, 'YYYY-MM-DD');
                            if(formattedDate.isValid()){
                                form.setFieldsValue({ [dataIndex]: formattedDate });
                                const updatedRecord = { ...record, [dataIndex]: formattedDate.format('YYYY-MM-DD') };
                                if (record.No !== undefined) {
                                    updatedRecord.No = record.No;  // 기존 No 값 유지
                                }
                                handleSave(updatedRecord);
                            }
                            else{
                                console.error('Invalid date:', dateString);
                            }
                            toggleEdit();
                        }}

                        onOpenChange={(open) => {
                            setIsDatePickerOpen(open); // 열림/닫힘 상태 관리
                            if(!open){
                                setTimeout(() => toggleEdit(), 150); // 닫힐 때 편집 종료
                            }
                        }}
                    />
                </div>
            </Form.Item>
            ) : (
                <div onClick={toggleEdit} className="text-center cursor-pointer">
                    {record[dataIndex] || new Date().toISOString().split(" T ")[0]}
                </div>
            );
        }
          
        else if(type === 'file'){
            const inputId = `file-upload-${uuidv4()}`;
            const wrapperRef = useRef(null);
          
            // 외부 클릭 감지 함수
            const handleClickOutside = (event)=>{
                if(wrapperRef.current && !wrapperRef.current.contains(event.target)){
                    toggleEdit();
                }
            };
          
            useEffect(()=>{
                if(editing){
                    document.addEventListener('mousedown', handleClickOutside);
                }
                else{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
                return ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                };
            }, [editing]);
          
            childNode = editing ? (
                <Form.Item name={dataIndex} className="m-0">
                    <div ref={wrapperRef}>
                        <input
                            type="file"
                            id={inputId}
                            ref={inputRef}
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if(file){
                                    form.setFieldsValue({ [dataIndex]: file.name });
                                    const updatedRecord = { ...record, [dataIndex]: file.name };
                                    handleSave(updatedRecord);
                                    toggleEdit();
                                }
                            }}
                        />
                        <label
                            htmlFor={inputId}
                            className="cursor-pointer text-[#1890ff]"
                        >
                            📁 파일 선택하기
                        </label>
                    </div>
                </Form.Item>
            ) : (
                <div onClick={toggleEdit} className="text-center cursor-pointer">
                    {record[dataIndex] ? record[dataIndex] : '파일 업로드'}
                </div>
            );
        }
        else if(type === 'select'){
            childNode = editing ? (
                <Form.Item name={dataIndex} className="m-0 text-center cursor-pointer">
                    <Select
                        ref={inputRef}
                        initialvalues={record[dataIndex]} // 초기 선택값 설정
                        onChange={(value) => {
                            // 선택한 값으로 폼 필드 업데이트
                            form.setFieldsValue({ [dataIndex]: value });
        
                            // 기존 데이터에 선택한 값 병합
                            const updatedRecord = { ...record, [dataIndex]: value };
        
                            // No 필드 유지
                            if (record.No !== undefined) {
                                updatedRecord.No = record.No;
                            }    
                            // 데이터 저장 및 편집 종료
                            handleSave(updatedRecord);
                            toggleEdit();
                        }}
                        onBlur={() => {
                            toggleEdit(); // 포커스 아웃 시 편집 종료
                        }}
                    >
                        {selects.map((data) => (
                            <Select.Option key={data} value={data}>
                                {data}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            ) : (
                <div onClick={toggleEdit} className="text-center cursor-pointer">
                    {record[dataIndex] || '선택'}
                </div>
            );
        }
        else{
            childNode = editing ? (
                <Form.Item name={dataIndex} className="m-0">
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} maxLength={maxlength}/>
                </Form.Item>
            ) : (
                <div onClick={toggleEdit} className="min-h-2 text-center cursor-pointer py-[10px]">
                    {children}
                </div>
            );
        }
    }
    else{
        childNode = (<div onClick={toggleEdit} className="min-h-2 text-center">
                        {children}
                    </div>);
    }
  
    return <td {...restProps}>{childNode}</td>;
};

const App = ({dataSource, setDataSource,defaultColumns}) => {
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
                title: col.title,
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
const StyledTable = styled(App)`
`;
function TableLayout({ title,subTitle, children }) {
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
  
function TableTitle({ titles }) {
    return (
        <tr className="border-b border-gray-300 sticky top-0 bg-white">  
            {titles.map((title, index) => (
                <th key={index} className="px-4 py-1 border-b border-gray-300">{title}</th>
            ))}
        </tr>
    );
  }
export {StyledTable,TableLayout,TableTitle};