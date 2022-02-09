import * as React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

const {
  Footer: AntdFooter,
} = Layout;

const StyledFooter = styled(AntdFooter)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

function Footer() {
  return (
    <StyledFooter>© Developed by Preezma</StyledFooter>
  );
}

export { Footer };
