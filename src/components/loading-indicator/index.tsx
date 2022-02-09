import React from 'react';
import styled from 'styled-components';
import {
  Spin,
  Space,
} from 'antd';

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

function LoadingIndicator() {
  return (
    <LoadingContainer>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </LoadingContainer>
  );
}

export { LoadingIndicator };
