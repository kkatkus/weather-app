import { put, takeLatest, fork } from 'redux-saga/effects';
import axios from 'axios';

import {
  WEATHER_FETCH_SUCCESS,
  WEATHER_FETCH_FAIL,
  WEATHER_PLACE_UPDATE,
  WEATHER_MY_LOCATION_SET,
  WEATHER_MY_LOCATION_DENIED,
  WEATHER_CLEAR_ERROR,
} from '../../actions';
import { HERE_APP_ID, HERE_APP_CODE } from '../../constants';
import { mapObservation, getCurrentPosition } from './helper';

function* getMyGeolocation() {
  try {
    yield put({
      type: WEATHER_CLEAR_ERROR,
    });
    const myCoords = yield getCurrentPosition();
    const place = yield getWeather({
      payload: myCoords,
    });
    if (!place) {
      return;
    }
    yield put({
      type: WEATHER_PLACE_UPDATE,
      payload: {
        id: '',
        placeId: '',
        description: [place.city, place.state, place.country].filter(f => !!f).join(', '),
        lat: place.latitude,
        lng: place.longitude,
      },
    });
  } catch (e) {
    if (!e) {
      console.log("can't use geolocation");
      yield put({
        type: WEATHER_MY_LOCATION_DENIED,
        payload: 'Geolocation denied!',
      });
      return;
    }
    console.log('myLocation error', e);
  }
}

function* getWeather({ payload }) {
  try {
    const params: any = {
      app_id: HERE_APP_ID,
      app_code: HERE_APP_CODE,
      product: 'observation',
    };
    if (payload.lat && payload.lng) {
      params.latitude = payload.lat;
      params.longitude = payload.lng;
    } else {
      params.name = payload.description;
    }
    const response = yield axios({
      method: 'get',
      url: '/weather/1.0/report.json',
      timeout: 5000,
      params,
    });
    if (
      !response.data ||
      !response.data.observations ||
      !response.data.observations ||
      !response.data.observations.location ||
      !response.data.observations.location.length
    ) {
      throw Error('Incorrect weather data');
    }
    const o = response.data.observations.location[0];
    yield put({
      type: WEATHER_FETCH_SUCCESS,
      payload: {
        place: { timezone: o.timezone, lat: parseFloat(o.latitude), lng: parseFloat(o.longitude) },
        observation: mapObservation(o.observation[0]),
      },
    });
    return o;
  } catch (e) {
    yield put({ type: WEATHER_FETCH_FAIL, payload: e.message || 'Failed to fetch weather' });
  }
}

export function* ratesSagas() {
  yield takeLatest(WEATHER_PLACE_UPDATE as any, getWeather);
  yield takeLatest(WEATHER_MY_LOCATION_SET as any, getMyGeolocation);
  yield fork(getMyGeolocation);
}
