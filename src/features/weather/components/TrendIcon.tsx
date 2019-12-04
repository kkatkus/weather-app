import React from 'react';
import styled from '@emotion/styled';

import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

interface Props {
  trend: 'Falling' | 'Rising' | '';
}

const Wrapper = styled('div')`
  display: inline-block;
  position: relative;
  top: 4px;
`;

const TrendIcon = ({ trend }: Props) => {
  if (trend === '') {
    return null;
  }
  if (trend === 'Falling') {
    return (
      <Wrapper>
        <TrendingDownIcon></TrendingDownIcon>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <TrendingUpIcon></TrendingUpIcon>
    </Wrapper>
  );
};

export default TrendIcon;
