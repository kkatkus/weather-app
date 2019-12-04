import * as React from 'react';
import styled from '@emotion/styled';

import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled('div')`
  display: table;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props: any) => (props.theme ? props.theme.colors.background : '')};
  color: ${(props: any) => props.theme.colors.onBackground};
`;

const Inner = styled('div')`
  display: table;
  width: 100%;
  max-width: 1200px;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Layout = ({ children }: Props) => (
  <Wrapper>
    <Inner>
      <Header />
      {children}
    </Inner>
  </Wrapper>
);

export default Layout;
