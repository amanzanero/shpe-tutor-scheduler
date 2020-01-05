/**
 * Page level reducer for the landing page
 */
import {
  TOGGLE_SETTINGS,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  TOGGLE_ADD_COURSES,
  ADD_COURSES,
  ADD_COURSES_SUCCESS,
  ADD_COURSES_ERROR,
} from '../../types';

const initState = {
  settingsOpen: false,
  loading: true,
  addCoursesLoading: false,
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
    case ADD_COURSES:
      return { ...state, addCoursesLoading: true };
    case ADD_COURSES_SUCCESS:
      return { ...state, addCoursesLoading: false };
    case ADD_COURSES_ERROR:
      return { ...state, addCoursesLoading: false };
    default:
      return state;
  }
};

export default homePage;
