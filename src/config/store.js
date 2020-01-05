/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const initStore = () => {
  let store;
  let persistor = false;
  if (process.env.NODE_ENV === 'development') {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    store = createStore(
      persistedReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
    persistor = persistStore(store);
  } else {
    store = createStore(rootReducer);
  }
  return { store, persistor };
};
export default initStore;
