/**
 * Page level reducer for the landing page
 */
import {
  TOGGLE_LOGIN_MODAL,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_REGISTER_ERROR_RESOLVE,
} from '../../types';

const initState = {
  modalOpen: false,
  loading: false,
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
      return { ...state, loading: true };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        registerError: { status: true, message: action.payload },
      };
    case USER_REGISTER_ERROR_RESOLVE:
      return {
        ...state,
        registerError: { status: false, message: '' },
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerError: { status: false, message: '' },
      };
    default:
      return state;
  }
};

export default landingPage;
