import * as React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  AppContent, CreateTableModal, Footer, Header,
} from '..';
import { SideBar } from '../side-bar';
import { getTableList } from '../../store/reducers/table-list/reducers/extra-reducers';

const StyledLayout = styled(Layout)`
    height: 100vh;
    background-color: white;
`;

function AppLayout() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState<null | string>(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTableList());
  }, []);

  const handleOnVisibilityChange = (visible: boolean) => {
    setCreateModalVisible(visible);
  };

  const onSelectTable = (table: string) => setSelectedTable(table);

  const resetSelectedTable = () => {
    setSelectedTable(null);
  };

  return (
    <>
      <CreateTableModal
        visible={createModalVisible}
        handleOnVisibilityChange={handleOnVisibilityChange}
      />
      <StyledLayout>
        <Header />
        <Layout>
          <SideBar
            showModal={() => handleOnVisibilityChange(true)}
            onSelectTable={onSelectTable}
            selectedTable={selectedTable}
          />
          <AppContent resetSelectedTable={resetSelectedTable} selectedTable={selectedTable} />
        </Layout>
        <Footer />
      </StyledLayout>
    </>

  );
}

export { AppLayout };
