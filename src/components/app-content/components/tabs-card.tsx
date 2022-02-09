import React, { useEffect, useState } from 'react';
import {
  Card,
} from 'antd';
import { useDispatch } from 'react-redux';
import { DataTable } from '../..';
import { deleteTable, listDataRows } from '../../../api';
import { mapTableDataWithColumns } from '../../../helpers';
import { getTableList } from '../../../store/reducers/table-list/reducers/extra-reducers';

const tabKeys = {
  table: 'table',
};

const tabList = [
  {
    key: tabKeys.table,
    tab: 'Table',
  },
];

interface Props {
  selectedTable: string;
  resetSelectedTable: () => void;
}

const TabsCard = ({ resetSelectedTable, selectedTable }: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState(tabKeys.table);
  const [tableData, setTableData] = useState<any>({
    data: [],
    columns: [],
  });

  const updateTableData = async () => {
    try {
      const tableDataResponse = await listDataRows(selectedTable);
      const mappedTableData = mapTableDataWithColumns(tableDataResponse.data.result);
      setTableData(mappedTableData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOnDeleteTable = async () => {
    try {
      resetSelectedTable();
      setLoading(true);
      await deleteTable(selectedTable);
      await dispatch(getTableList());
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTable) {
      updateTableData();
    }
  }, [selectedTable]);

  const onTabChange = (key: any) => {
    setActiveTabKey(key);
  };

  const renderContent = () => {
    if (activeTabKey === tabKeys.table) {
      return (
        <DataTable
          loading={loading}
          data={tableData}
          deleteTable={handleOnDeleteTable}
          selectedTable={selectedTable}
          updateTableData={updateTableData}
        />
      );
    }

    return null;
  };

  return (
    <Card
      style={{ width: '100%', height: '100%' }}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      {renderContent()}
    </Card>
  );
};

export { TabsCard };
