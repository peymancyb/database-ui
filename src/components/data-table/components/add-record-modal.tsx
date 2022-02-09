import React, { useState } from 'react';
import {
  Form,
  Input,
  Modal,
  Button,
} from 'antd';
import _ from 'lodash';
import { insertData } from '../../../api';

interface Props {
    visible: boolean;
    handleOnVisibilityChange: (visible: boolean) => void;
    columns: string[];
    selectedTable: string;
    updateTableData: () => void;
}

function AddRecordModal({
  selectedTable,
  visible,
  handleOnVisibilityChange,
  columns,
  updateTableData,
}: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const getQueryString = (data: any, isValue: boolean = false) => data.reduce((acc: string, item: any, index: number) => {
    const isLast = index === (data.length - 1);
    if (isValue) {
      acc += ` '${item}' ,`;
    } else {
      acc += ` ${item} ,`;
    }
    if (isLast) {
      acc = acc.substring(0, acc.length - 1);
    }
    return acc;
  }, '');

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = form.getFieldsValue();
      const keysQuery = getQueryString(Object.keys(values));
      const valuesQuery = getQueryString(Object.values(values), true);
      await insertData(selectedTable, keysQuery, valuesQuery);
      await updateTableData();
      form.resetFields();
      handleOnVisibilityChange(false);
    } catch (error) {
      // TODO: handle error
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    handleOnVisibilityChange(false);
  };

  return (
    <Modal
      visible={visible}
      title="Add record"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Add
        </Button>,
      ]}
      width={600}
    >
      <Form
        name="basic"
        autoComplete="off"
        preserve={false}
        form={form}
      >
        {columns.map((item) => (
          <Form.Item
            label={item}
            name={item}
            key={item}
          >
            <Input />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
}

export { AddRecordModal };
