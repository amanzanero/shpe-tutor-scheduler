import { combineReducers } from 'redux';
import landingPage from './pages/LandingPage/reducer';
import homePage from './pages/HomePage/reducer';
import { SET_USER } from './types';

const globalInitialState = {
  user: {},
  error: '',
  loading: false,
};

const globalStore = (state = globalInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default combineReducers({ globalStore, landingPage, homePage });
