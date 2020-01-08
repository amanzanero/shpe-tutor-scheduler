/**
 * Page level reducer for the landing page
 */
import {
  TOGGLE_LOGIN_MODAL,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_REGISTER_ERROR_RESOLVE,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
} from '../types';

const initState = {
  modalOpen: false,
  loading: false,
  pageErr: {
    status: false,
    message: '',
  },
};

const landingPage = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return { ...state, modalOpen: !state.modalOpen };
    case USER_REGISTER:
      return { ...state, loading: true };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        pageErr: { status: true, message: action.payload },
      };
    case USER_REGISTER_ERROR_RESOLVE:
      return {
        ...state,
        pageErr: { status: false, message: '' },
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        pageErr: { status: false, message: '' },
      };
    case USER_LOGIN:
      return { ...state, loading: true };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        pageErr: { status: true, message: action.payload },
        modalOpen: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        pageErr: { status: false, message: '' },
        modalOpen: false,
      };
    default:
      return state;
  }
};

export default landingPage;
