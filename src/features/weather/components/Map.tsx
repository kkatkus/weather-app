import React, { useEffect } from 'react';
import { formatTemp } from '../helper';
import { useSelector } from 'react-redux';
import RootState from '../../../RootState';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
  position: relative;
  width: 100%;
  min-height: 40vh;
`;

const googleService: any = { current: null };
const mapService: any = { current: null };

const Map = () => {
  const [place, observation] = useSelector((state: RootState) => [state.weather.place, state.weather.observation]);

  // render map
  useEffect(() => {
    if (!googleService.current && (window as any).google) {
      googleService.current = (window as any).google;
    }

    if (!observation || !place) {
      return;
    }

    mapService.current = new googleService.current.maps.Map(document.getElementById('weather-map'), {
      zoom: 10,
      center: { lat: place.lat, lng: place.lng },
    });

    const marker = new (window as any).MarkerWithLabel({
      map: mapService.current,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif',
      position: { lat: place.lat, lng: place.lng },
      labelContent: `<div><img src=${observation.icon} />${formatTemp(observation.temperature)}</span>`,
      labelAnchor: new googleService.current.maps.Point(40, -10),
      labelClass: 'weather-marker',
      labelInBackground: false,
    });

    const iw = new googleService.current.maps.InfoWindow({
      pixelOffset: '10px',
      content: `<div class="weather-iw">
          <p><label>Temperature</label>${formatTemp(observation.temperature)}</p>
          <p><label>Wind</label>${observation.windSpeed} km/h</p>
          <p><label>Humidity</label>${observation.humidity}%</p>
          <p><label>Dew Point</label>${formatTemp(observation.dewPoint)}</p>
          <p><label>Pressure</label>${observation.barometerPressure}</p>
          <p><label>Visibility</label>${observation.visibility} km</p>
        </div>`,
    });
    googleService.current.maps.event.addListener(marker, 'click', e => {
      iw.open(mapService.current, marker);
    });
  }, [place, observation]);

  return <Wrapper id="weather-map"></Wrapper>;
};

export default Map;
