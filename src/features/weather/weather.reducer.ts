import {
  WEATHER_FETCH_SUCCESS,
  WEATHER_FETCH_FAIL,
  WEATHER_PLACE_UPDATE,
  WEATHER_SET_LOADING,
  WEATHER_ADD_HISTORY,
  WEATHER_MY_LOCATION_DENIED,
  WEATHER_CLEAR_ERROR,
} from '../../actions';
import WeatherState from './WeatherState';

export const defaultState: WeatherState = {
  loading: false,
  history: [],
};

const weatherReducer = (state: WeatherState = defaultState, action) => {
  switch (action.type) {
    case WEATHER_CLEAR_ERROR:
      return { ...state, error: '' };
    case WEATHER_SET_LOADING:
      return { ...state, loading: true };
    case WEATHER_MY_LOCATION_DENIED:
      return { ...state, loading: false, error: action.payload };
    case WEATHER_PLACE_UPDATE:
      return { ...state, place: { ...state.place, ...action.payload } };
    case WEATHER_ADD_HISTORY: {
      const history = [...state.history];
      if (!history.some(f => f.place_id === action.payload.place_id)) {
        history.push(action.payload);
      }
      return { ...state, history };
    }
    case WEATHER_FETCH_SUCCESS:
      return {
        ...state,
        place: { ...(state.place || {}), ...action.payload.place },
        observation: { ...(state.observation || {}), ...action.payload.observation },
        loading: false,
      };
    case WEATHER_FETCH_FAIL:
      return { ...state, error: action.payload, loading: false };
    default: {
      return state;
    }
  }
};

export default weatherReducer;
