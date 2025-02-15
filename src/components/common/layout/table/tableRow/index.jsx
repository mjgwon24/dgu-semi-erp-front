import locale from 'antd/locale/ko_KR';
import React from 'react';
import { Form } from 'antd';
import EditableContext from '..';
const EditableRow = ({ index,className,onRowClick, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} className={`${className}`} onClick={()=>{index!=undefined&&onRowClick(index)}}/>
            </EditableContext.Provider>
        </Form>
    );
};
export default EditableRow;