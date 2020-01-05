import { combineReducers } from 'redux';
import landingPage from './pages/LandingPage/reducer';
import homePage from './pages/HomePage/reducer';
import { SET_USER, SET_COURSES, UPDATE_USER, USER_LOGOUT } from './types';

const globalInitialState = {
  user: {},
  error: '',
  loading: false,
  courses: [],
};

const globalStore = (state = globalInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_COURSES:
      return { ...state, courses: action.payload };
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          [action.field]: action.data,
        },
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default combineReducers({ globalStore, landingPage, homePage });
