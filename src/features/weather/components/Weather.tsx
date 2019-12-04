import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import styled from '@emotion/styled';

import InfoCard from './InfoCard';
import Map from './Map';
import Loader from '../../../shared/components/Loader';
import RootState from '../../../RootState';

const Wrapper = styled('div')`
  position: relative;
  display: table;
  width: 100%;
  min-height: 40vh;
`;

const Weather = () => {
  const [loading] = useSelector((state: RootState) => [state.weather.loading]);
  return (
    <Wrapper>
      <Loader loading={loading}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper style={{ minHeight: '40vh' }}>
              <InfoCard />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ minHeight: '40vh' }}>
              <Map />
            </Paper>
          </Grid>
        </Grid>
      </Loader>
    </Wrapper>
  );
};

export default Weather;
