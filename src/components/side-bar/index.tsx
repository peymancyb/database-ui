import React from 'react';
import {
  Layout,
  Menu,
  Button,
  Empty,
} from 'antd';
import styled from 'styled-components';
import { TableOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectTableListState } from '../../store/reducers/table-list/selectors';
import { TableData } from '../../store/reducers/table-list/types';

const {
  Sider,
} = Layout;

const StyledMenu = styled(Menu)`
    flex: 1;
    height: 100%;
    min-width: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    }
`;

const StyledSider = styled(Sider)`
    display: flex;
    flex: 1;
    background-color: white;
    justify-content: space-between;
    min-width: 300px !important;
    height: 100%;
`;

const ActionsContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const EmptyContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface Props {
  showModal: () => void
  onSelectTable: (table: any) => void
  selectedTable: null | string
}

function SideBar({ selectedTable, showModal, onSelectTable }: Props) {
  const tableListState = useSelector(selectTableListState);

  const handleOnItemClick = (table: TableData) => {
    if (table) {
      onSelectTable(table.table_name);
    }
  };

  const renderMenuContent = () => {
    if (tableListState.data) {
      return tableListState.data.map((table) => (
        <Menu.Item
          onClick={() => handleOnItemClick(table)}
          key={table.table_name}
        >
          {table.table_name}
        </Menu.Item>
      ));
    }
    return (
      <EmptyContainer>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No table found"
        />
      </EmptyContainer>
    );
  };

  const handleOnCreateTable = () => {
    showModal();
  };

  return (
    <StyledSider>
      <StyledMenu
        mode="inline"
        selectedKeys={selectedTable ? [selectedTable] : []}
      >
        {renderMenuContent()}
      </StyledMenu>
      <ActionsContainer>
        <Button
          shape="round"
          type="primary"
          icon={<TableOutlined />}
          size="large"
          onClick={handleOnCreateTable}
        >
          Create table
        </Button>
      </ActionsContainer>
    </StyledSider>
  );
}

export { SideBar };
