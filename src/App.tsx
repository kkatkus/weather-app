import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';

import AppRoutes from './AppRoutes';
import RootState from './RootState';
import * as themes from './shared/styles';
import Layout from './features/layout';
import Notification from './shared/components/Notification';

const App = () => {
  const [theme] = useSelector((state: RootState) => [state.settings.theme]);
  return (
    <ThemeProvider theme={themes[theme]}>
      <Layout>
        <AppRoutes />
        <Notification />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
