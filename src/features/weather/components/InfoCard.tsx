import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import RootState from '../../../RootState';
import { Grid } from '@material-ui/core';
import { transparentize } from 'polished';
import TrendIcon from './TrendIcon';
import { formatTemp } from '../helper';

const Wrapper = styled('div')`
  position: relative;
  padding: 20px;
`;

const Title = styled('div')`
  text-align: center;
  font-size: 28px;
  padding-bottom: 20px;
`;

const Temp = styled('div')`
  display: block;
  float: left;
  font-size: 48px;
`;

const Icon = styled('img')`
  float: left;
`;

const Description = styled('div')`
  display: block;
  width: 100%;
  font-size: 14px;
  padding-bottom: 10px;
  color: ${(props: any) => (props.theme ? transparentize(0.5, props.theme.colors.input) : '')};
`;

const FeelsLike = styled('div')`
  display: block;
  width: 100%;
`;

const DL = styled('dl')`
  float: right;
  max-width: 180px;
`;
const DT = styled('dt')`
  font-size: 18px;
  padding: 10px 0;
  label {
    font-size: 14px;
    display: block;
    width: 100%;
    clear: both;
    color: ${(props: any) => (props.theme ? transparentize(0.1, props.theme.colors.input) : '')};
  }
  border-bottom: 1px solid ${(props: any) => (props.theme ? transparentize(0.8, props.theme.colors.input) : '')};
  :last-child {
    border-bottom: 0;
  }
`;

const InfoCard = () => {
  const [place, observation] = useSelector((state: RootState) => [state.weather.place, state.weather.observation]);

  if (!observation || !place) {
    return null;
  }

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title>{place.description}</Title>
        </Grid>
        <Grid item xs={8} sm={7}>
          <div style={{ display: 'table', clear: 'both', width: '100%' }}>
            <Temp>{formatTemp(observation.temperature)}</Temp>
            <Icon src={observation.icon} alt="weather icon" />
          </div>

          <Description>{observation.description}</Description>
          <FeelsLike>
            Feels like <strong>{formatTemp(observation.comfort)}</strong>
            <br />H {formatTemp(observation.highTemperature)} / L {formatTemp(observation.lowTemperature)}
          </FeelsLike>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Grid item xs={12}>
            <DL>
              <DT>
                <strong>RIGHT NOW</strong>
              </DT>
              <DT>
                <label>Wind</label>
                {observation.windDescShort} {observation.windSpeed} km/h
              </DT>
              <DT>
                <label>Humidity</label>
                {observation.humidity}%
              </DT>
              <DT>
                <label>Dew Points</label>
                {formatTemp(observation.dewPoint)}
              </DT>
              <DT>
                <label>Pressure</label>
                {observation.barometerPressure} mb <TrendIcon trend={observation.barometerTrend}></TrendIcon>
              </DT>
              <DT>
                <label>Visibility</label>
                {observation.visibility} km
              </DT>
            </DL>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default InfoCard;
