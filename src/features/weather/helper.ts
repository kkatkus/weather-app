import { Observation } from './Observation';

export const mapObservation = (observationDto: any): Partial<Observation> => {
  if (!observationDto) {
    return {};
  }
  return {
    temperature: observationDto.temperature,
    icon: observationDto.iconLink,
    description: observationDto.description,
    comfort: observationDto.comfort,
    highTemperature: observationDto.highTemperature,
    lowTemperature: observationDto.lowTemperature,
    windDescShort: observationDto.windDescShort,
    windSpeed: observationDto.windSpeed,
    humidity: observationDto.humidity,
    dewPoint: observationDto.dewPoint,
    barometerPressure: observationDto.barometerPressure,
    barometerTrend: observationDto.barometerTrend,
    visibility: observationDto.visibility,
  };
};

export const formatTemp = (temp: string): string => {
  const i = parseFloat(temp);
  return isNaN(i) ? '' : `${i.toFixed(0)}°`;
};

export const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => reject(),
    );
  });
