import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import settings from './features/settings/settings.reducer';
import weather from './features/weather/weather.reducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    settings,
    weather,
  });

export default rootReducer;
