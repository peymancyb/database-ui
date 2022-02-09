import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Layout,
  Result,
} from 'antd';
import { TabsCard } from './components/tabs-card';

const {
  Content,
} = Layout;

const StyledContent = styled(Content)`    
  width: 100% !important;
  height: 100% !important;
`;

const EmptyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

interface Props {
  selectedTable: null | string;
resetSelectedTable: () => void;
}

function AppContent({ resetSelectedTable, selectedTable }: Props) {
  return (
    <StyledContent>
      {!selectedTable ? (
        <EmptyContainer>
          <Result
            status="404"
            title="Table not found"
            subTitle="Please select a table from the sidebar"
          />
        </EmptyContainer>
      ) : <TabsCard resetSelectedTable={resetSelectedTable} selectedTable={selectedTable} />}
    </StyledContent>
  );
}

export { AppContent };
