export interface Observation {
  temperature: string;
  icon: string;
  description: string;
  comfort: string;
  highTemperature: string;
  lowTemperature: string;
  windDescShort: string;
  windSpeed: string;
  humidity: string;
  dewPoint: string;
  barometerPressure: string;
  barometerTrend: 'Falling' | 'Rising' | '';
  visibility: string;
}
