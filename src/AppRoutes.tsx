import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Weather from './features/weather/components/Weather';

const AppRoutes = () => (
  <Switch>
    <Redirect exact path="/" to="/weather" />

    <Route exact path="/weather" component={Weather} />
    <Route exact path="/404" component={() => <h1>Not found.</h1>} />

    <Redirect path="*" to="/404" />
  </Switch>
);

export default AppRoutes;
