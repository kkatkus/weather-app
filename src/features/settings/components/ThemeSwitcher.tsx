import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import RootState from '../../../RootState';
import { changeTheme } from '../settings.actions';
import { ThemeEnum } from '../ThemeEnum';
import styled from '@emotion/styled';

const ThemeSwitcherStyled = styled('div')`
  display: none;
  position: absolute;
  top: 1em;
  right: 1em;
  button {
    padding: 3px 6px;
    text-transform: none;
    font-size: 14px;
    border-radius: 5px;
    height: auto;
  }
`;

const ThemeSwitcher = () => {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, [dispatch]);

  const handleSwitch = () => {
    dispatch(changeTheme(ThemeEnum.Dark === theme ? ThemeEnum.Light : ThemeEnum.Dark));
  };

  return (
    <ThemeSwitcherStyled>
      <button onClick={() => handleSwitch()}>Switch Theme</button>
    </ThemeSwitcherStyled>
  );
};

export default ThemeSwitcher;
