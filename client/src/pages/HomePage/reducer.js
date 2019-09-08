/**
 * Page level reducer for the landing page
 */
import {
  TOGGLE_SETTINGS,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
} from '../../types';

const initState = {
  settingsOpen: false,
  loading: true,
  pageErr: {
    status: false,
    message: '',
  },
};

const homePage = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return { ...state, settingsOpen: !state.settingsOpen };
    case GET_PROFILE:
      return { ...state, loading: true };
    case GET_PROFILE_SUCCESS:
      return { ...state, loading: false };
    case GET_PROFILE_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default homePage;
