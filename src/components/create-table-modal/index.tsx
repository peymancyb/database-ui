import React, { useMemo, useState } from 'react';
import {
  Form,
  Input,
  Modal,
  Button,
  Space,
  Select,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { createTable } from '../../api';
import { getTableList } from '../../store/reducers/table-list/reducers/extra-reducers';

const { Option } = Select;

interface Props {
    visible: boolean;
    handleOnVisibilityChange: (visible: boolean) => void;
}

function CreateTableModal({ visible, handleOnVisibilityChange }: Props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const getColumnQuery = (columns: any) => columns.reduce((acc: string, item: any, index: number) => {
    const isLast = index === (columns.length - 1);
    acc += ` ${item.columnName} ${item.type},`;
    if (isLast) {
      acc = acc.substring(0, acc.length - 1);
    }
    return acc;
  }, '');

  const handleOk = async () => {
    setLoading(true);
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const columnQuery = getColumnQuery(values.tableColumns);
      await createTable(values.tableName, columnQuery);
      await dispatch(getTableList());
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
      title="Create table"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Create
        </Button>,
      ]}
      width={600}
    >
      <Form
        name="basic"
        initialValues={{
          tableName: '',
          tableColumns: [{}],
        }}
        autoComplete="off"
        preserve={false}
        form={form}
      >
        <Form.Item
          label="Table name"
          name="tableName"
          rules={[{ required: true, message: 'Please provide table name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.List
          name="tableColumns"
          rules={[
            {
              validator: async (event, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(new Error('At least 1 column required'));
                }
                return true;
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    {...field}
                    label="Column name"
                    name={[field.name, 'columnName']}
                    rules={[{ whitespace: true, required: true, message: 'Missing column name' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Type"
                    name={[field.name, 'type']}
                    rules={[{ required: true, message: 'Missing type' }]}
                  >
                    <Select style={{ width: 100 }}>
                      <Option value="text">text</Option>
                    </Select>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => {
                    remove(field.name);
                  }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Add column
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}

export { CreateTableModal };
