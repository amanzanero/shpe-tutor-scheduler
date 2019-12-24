/**
 * Page level reducer for the landing page
 */
import {
  TOGGLE_SETTINGS,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  TOGGLE_ADD_COURSES,
} from '../../types';

const initState = {
  settingsOpen: false,
  loading: true,
  pageErr: {
    status: false,
    message: '',
  },
  addCoursesOpen: false,
};

const homePage = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return {
        ...state,
        settingsOpen: !state.settingsOpen,
        addCoursesOpen: false,
      };
    case TOGGLE_ADD_COURSES:
      return {
        ...state,
        settingsOpen: false,
        addCoursesOpen: !state.addCoursesOpen,
      };
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
