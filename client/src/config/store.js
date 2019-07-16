/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import rootReducer from '../reducer';

const initStore = () => {
  return process.env.NODE_ENV === 'development'
    ? createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
      )
    : createStore(rootReducer);
};
export default initStore;
