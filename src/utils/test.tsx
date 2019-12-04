import React, { ReactNode } from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mergeDeepRight } from 'ramda';

import { ThemeProvider } from 'emotion-theming';
import * as themes from '../shared/styles';
import RootState from '../RootState';

const defaultState = {
  weather: {
    loading: false,
    error: '',
    place: {},
    observation: {},
    history: [],
  },
  settings: {
    loading: false,
    theme: 'light',
  },
};

export const getMockProvider = (partialState: any = {}) => {
  const mockStore: any = configureStore();
  const store: any = mockStore(mergeDeepRight(defaultState, partialState));

  const MockProvider = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <ThemeProvider theme={themes[store.getState().settings.theme]}>{children}</ThemeProvider>
    </Provider>
  );

  return {
    MockProvider,
    store,
  };
};
