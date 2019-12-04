import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import LocalStorageState from './LocalStorageState';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({});

export const history = createBrowserHistory();

const configureStore = (localStorageState: LocalStorageState) => {
  const store = createStore(
    rootReducer(history),
    localStorageState,

    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        sagaMiddleware,
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
