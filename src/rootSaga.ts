import { all } from 'redux-saga/effects';

import { settingsSagas } from './features/settings/settings.sagas';
import { ratesSagas } from './features/weather/weather.sagas';

export default function* rootSaga() {
  yield all([
    // add sagas
    settingsSagas(),
    ratesSagas(),
  ]);
}
