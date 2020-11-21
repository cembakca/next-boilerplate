import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const store = (initialState) => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }

  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
};

export default store;
