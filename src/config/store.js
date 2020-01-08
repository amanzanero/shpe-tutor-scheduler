/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import rootReducer from '../reducers';

const initStore = () => {
  let store;
  if (process.env.NODE_ENV === 'development') {
    store = createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
  } else {
    store = createStore(rootReducer);
  }
  return store;
};
export default initStore;
