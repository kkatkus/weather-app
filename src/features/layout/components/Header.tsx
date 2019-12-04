import * as React from 'react';
import styled from '@emotion/styled';

import { darken } from 'polished';
import Search from '../../weather/components/Search';
import { Paper } from '@material-ui/core';

const Wrapper = styled('div')`
  display: table;
  width: 100%;
  padding: 20px 0 10px 0;
  background-color: ${(props: any) => (props.theme ? darken(0.0, props.theme.colors.background) : '')};
`;

const PaperStyled = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 400;
`;

const Header = () => (
  <Wrapper>
    <PaperStyled>
      <Search />
    </PaperStyled>
  </Wrapper>
);

export default Header;
