import WeatherState from './features/weather/WeatherState';

export default interface LocalStorageState {
  settings: {
    theme: string;
  };
  weather: WeatherState;
}
