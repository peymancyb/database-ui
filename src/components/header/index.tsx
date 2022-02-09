import * as React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Logo from '../../assets/logo.png';

const {
  Header: AntdHeader,
} = Layout;

const StyledHeader = styled(AntdHeader)`
    display: flex;
    background-color: white;
    justify-content: center;
    align-items: center;
    height: 80px;
`;

const LogoImage = styled.img`
    width: 120px;
`;

function Header() {
  return (
    <StyledHeader>
      <LogoImage src={Logo} alt="nhost-logo" />
    </StyledHeader>
  );
}

export { Header };
