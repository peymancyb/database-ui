import React, { useMemo, useState } from 'react';
import {
  Table,
  Form,
  Space,
  Button,
} from 'antd';
import { EditableCell } from './components/edit-table-cell';
import { LoadingIndicator } from '..';
import { AddRecordModal } from './components/add-record-modal';
import { deleteData } from '../../api';

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface Props {
  data: any;
  deleteTable: () => void;
  loading: boolean;
  selectedTable: string;
  updateTableData: () => void;
}

function DataTable({
  selectedTable,
  loading,
  deleteTable,
  data,
  updateTableData,
}: Props) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [recordModalVisible, setRecordModalVisible] = useState(false);

  const handleOnVisibilityChange = (visible: boolean) => {
    setRecordModalVisible(visible);
  };

  const isEditing = (record: Item) => record.key === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const onDeleteRecord = async (id: string) => {
    try {
      await deleteData(selectedTable, id);
      await updateTableData();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = useMemo(() => {
    const tableColumns = data.columns.map((column: any) => {
      const width = 100 / data.columns.length + 1;
      return {
        title: column,
        dataIndex: column,
        width: `${width}%`,
      };
    });

    return [
      ...tableColumns,
      {
        title: 'Action',
        key: 'action',
        render: (text: string, record: any) => (
          <Space size="middle">
            <Button danger onClick={() => onDeleteRecord(record.id)}>Delete</Button>
          </Space>
        ),
      }];
  }, [data]);

  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onDeleteTable = async () => {
    deleteTable();
  };

  const handleAddRow = () => {
    handleOnVisibilityChange(true);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <AddRecordModal
        visible={recordModalVisible}
        handleOnVisibilityChange={handleOnVisibilityChange}
        columns={data.columns.filter((column: string) => column !== 'id')}
        selectedTable={selectedTable}
        updateTableData={updateTableData}
      />
      <Form form={form} component={false}>
        <Button onClick={handleAddRow} type="primary" style={{ marginRight: 16 }}>
          Add a row
        </Button>
        <Button type="primary" danger onClick={onDeleteTable}>
          Delete table
        </Button>
        <Table
          bordered
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={data.data}
          columns={mergedColumns}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
}

export { DataTable };
