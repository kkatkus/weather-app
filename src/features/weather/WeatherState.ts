import { Place } from './Place';
import { Coords } from './Coords';
import { Observation } from './Observation';
import { PlaceDto } from './PlaceDto';

export default interface WeatherState {
  loading: boolean;
  error?: string;
  history: PlaceDto[];
  place?: Place;
  observation?: Observation;
}
