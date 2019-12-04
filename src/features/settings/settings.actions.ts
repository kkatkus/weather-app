import { SETTINGS_THEME_CHANGE } from '../../actions';
import { ThemeEnum } from './ThemeEnum';

export const changeTheme = (payload?: ThemeEnum) => ({
  type: SETTINGS_THEME_CHANGE,
  payload,
});
