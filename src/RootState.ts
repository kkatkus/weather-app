import { RouterState } from 'connected-react-router';

import SettingsState from './features/settings/SettingsState';
import WeatherState from './features/weather/WeatherState';

export default interface RootState {
  router: RouterState;
  settings: SettingsState;
  weather: WeatherState;
}
