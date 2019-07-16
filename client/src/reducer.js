import { combineReducers } from 'redux';
import landingPage from './pages/LandingPage/reducer';
import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} from './types';

const globalInitialState = {
  user: {},
  error: '',
  loading: false,
};

const global = (state = globalInitialState, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, user: { ...action.payload }, loading: false };
    case USER_REGISTER_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default combineReducers({ global, landingPage });
