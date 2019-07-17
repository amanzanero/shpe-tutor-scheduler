/**
 * Page level reducer for the landing page
 */
import {
  TOGGLE_LOGIN_MODAL,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} from '../../types';

const initState = {
  modalOpen: false,
  loading: false,
  registerError: {
    status: 0,
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
        registerError: { status: 1, message: action.payload },
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerError: { status: 0, message: '' },
      };
    default:
      return state;
  }
};

export default landingPage;
