import {
  WEATHER_MY_LOCATION_SET,
  WEATHER_SET_LOADING,
  WEATHER_PLACE_UPDATE,
  WEATHER_ADD_HISTORY,
  WEATHER_CLEAR_ERROR,
} from '../../actions';
import { Place } from './Place';

export const clearError = () => ({
  type: WEATHER_CLEAR_ERROR,
});

export const setLoading = () => ({
  type: WEATHER_SET_LOADING,
});

export const setMyLocation = () => ({
  type: WEATHER_MY_LOCATION_SET,
});

export const updatePlace = (place: Partial<Place>) => ({
  type: WEATHER_PLACE_UPDATE,
  payload: place,
});

export const addHistory = (history: any) => ({
  type: WEATHER_ADD_HISTORY,
  payload: history,
});
