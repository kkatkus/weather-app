import { SETTINGS_THEME_CHANGE } from '../../actions';
import { ThemeEnum } from './ThemeEnum';
import SettingsState from './SettingsState';

const defaultState: SettingsState = {
  loading: true,
  theme: ThemeEnum.Light,
};

const settingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SETTINGS_THEME_CHANGE:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
