/**
 * Page level reducer for the landing page
 */
import {
  TOGGLE_LOGIN_MODAL,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  LANDING_PAGE_ERROR_RESOLVE,
} from '../types';

const initState = {
  modalOpen: false,
  loading: false,
  loginError: {
    status: false,
    message: '',
  },
  registerError: {
    status: false,
    message: '',
  },
};

const landingPage = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return { ...state, modalOpen: !state.modalOpen };
    case USER_REGISTER:
      return {
        ...state,
        loading: true,
        registerError: { ...initState.registerError },
        loginError: { status: true, message: action.payload },
      };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        registerError: { status: true, message: action.payload },
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerError: { status: false, message: '' },
      };
    case USER_LOGIN:
      return {
        ...state,
        loading: true,
        registerError: { ...initState.registerError },
        loginError: { ...initState.loginError },
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        loginError: { status: true, message: action.payload },
        registerError: { ...initState.registerError },
        modalOpen: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginError: { status: false, message: '' },
        modalOpen: false,
      };
    case LANDING_PAGE_ERROR_RESOLVE:
      return {
        ...state,
        registerError: { ...initState.registerError },
        loginError: { ...initState.loginError },
      };
    default:
      return state;
  }
};

export default landingPage;
