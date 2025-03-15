import locale from 'antd/locale/ko_KR';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import EditableContext from '..';
import { Button } from 'antd';
// import styled from 'styled-components';

const EditableCell = ({
    editable,//수정 가능 여부 true false
    type,//데이터 입력 형식
    maxlength,//text입력일 경우 최대 길이
    dataIndex,
    record,
    selects,
    selectboxWidth,
    handleSave,
    PositiveTitle,
    NagativeTitle,
    handlePositive,
    handleNagative,
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
            if(values.amount&&values.amount.match(/[^0-9]/g)){
                values.amount = values.amount.replace(/[^0-9]/g, '');
            }
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
                <div ref={datePickerRef} className='flex justify-center'>
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
                <div onClick={toggleEdit} className="text-center cursor-pointer text-[16px]">
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
                    <div ref={wrapperRef} className="flex justify-center">
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
                            className="cursor-pointer text-[#1890ff] text-[16px] text-center"
                        >
                            📁 파일 선택하기
                        </label>
                    </div>
                </Form.Item>
            ) : (
                <div onClick={toggleEdit} className="text-center cursor-pointer text-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
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
                        style={{width:selectboxWidth}}
                    >
                        {selects.map((data) => (
                            <Select.Option key={data} value={data}>
                                {data}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            ) : (
                <div onClick={toggleEdit} className="text-center cursor-pointer text-[16px]">
                    {record[dataIndex] || '선택'}
                </div>
            );
        }
        else if(type=='money'){
            childNode = editing ? (
                <Form.Item name={dataIndex} className="m-0">
                    <Input
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            maxLength={maxlength}
            inputMode="numeric"
            className="text-center"
            onKeyDown={(e) => {
                if(e.key.match(/[^0-9]/g)){
                    setTimeout(()=>{e.target.value =  e.target.value.replace(/[^0-9]/g, '');},10)
                }
            }}
            type="text"
        />
                </Form.Item>
            ) : (
                <div onClick={toggleEdit} className=" text-center cursor-pointer text-[16px] w-full min-h-[16px]">
                    {/* 천단위 구분 표시 */}
                    {Number(children[1]).toLocaleString()}
                </div>
            );
        }
        else if(type=='number'){
            childNode = editing ? (
                <Form.Item name={dataIndex} className="m-0">
                    <Input
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            maxLength={maxlength}
            inputMode="numeric"
            className="text-center"
            onKeyDown={(e) => {
                if(e.key.match(/[^0-9]/g)){
                    setTimeout(()=>{e.target.value =  e.target.value.replace(/[^0-9]/g, '');},10)
                }
            }}
            type="text"
        />
                </Form.Item>
            ) : (
                <div onClick={toggleEdit} className="text-center cursor-pointer text-[16px] w-full min-h-[16px]">
                    {children}
                </div>
            );
        }
        else if(type=='text'){
            childNode = editing ? (
                <Form.Item name={dataIndex} className="m-0">
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} maxLength={maxlength} className="text-center"/>
                </Form.Item>
            ) : (
                <div onClick={toggleEdit} className="text-center cursor-pointer text-[16px] w-full min-h-[16px]">
                    {children}
                </div>
            );
        }
        else if(type=='accept'){
            childNode = (<div className="flex flex-row gap-2 w-full justify-center">
                <Button onClick={handlePositive} type="primary" className='border-2 border-solid border-[#1E7EE4] text-[#1E7EE4] bg-[#FFFFFF] h-[32px]'>{PositiveTitle}</Button>
                <Button onClick={handleNagative} type="danger" className='border-2 border-solid border-[#D11E1E] text-[#D11E1E] bg-[#FFFFFF] hover:bg-[#D11E1E] hover:text-[#FFFFFF]'>{NagativeTitle}</Button>
            </div>)
        }
    }
    //No필드
    else{
        childNode = (<div className="text-center text-[16px] cursor-pointer">
                        {children}
                    </div>);
    }
    
    
    return <td {...restProps} style={{paddingLeft:`${editing||type=='accept'?'0px':'16px'}`,paddingRight:`${editing||type=='accept'?'0px':'16px'}`,paddingTop:`${editing||type=='accept'?'8px':'15px'}`,paddingBottom:`${editing||type=='accept'?'8px':'15px'}`,
    wordBreak: 'break-word',  // 줄바꿈 적용
    whiteSpace: 'normal',  // 공백 유지
    overflowWrap: 'break-word'}}>{childNode}</td>;
};
export default EditableCell;