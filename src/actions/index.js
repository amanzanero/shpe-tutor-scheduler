import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  TOGGLE_LOGIN_MODAL,
  TOGGLE_SETTINGS,
  SET_USER,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  TOGGLE_ADD_COURSES,
  SET_COURSES,
  UPDATE_USER,
  ADD_COURSES,
  ADD_COURSES_SUCCESS,
  ADD_COURSES_ERROR,
  USER_LOGOUT,
  LANDING_PAGE_ERROR_RESOLVE,
  LOAD_COURSES,
  LOAD_COURSES_ERROR,
  LOAD_COURSES_SUCCESS,
} from '../types';

export const userRegister = () => {
  return {
    type: USER_REGISTER,
  };
};

export const userRegisterSuccess = payload => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload,
  };
};

export const userRegisterError = payload => {
  return {
    type: USER_REGISTER_ERROR,
    payload,
  };
};

export const setUser = payload => {
  return {
    type: SET_USER,
    payload,
  };
};

export const toggleLoginModal = () => {
  return {
    type: TOGGLE_LOGIN_MODAL,
  };
};

export const toggleSettingsModal = () => {
  return {
    type: TOGGLE_SETTINGS,
  };
};

export const userLogin = payload => {
  return {
    type: USER_LOGIN,
    payload,
  };
};

export const userLoginSuccess = () => {
  return {
    type: USER_LOGIN_SUCCESS,
  };
};

export const userLoginError = payload => {
  return {
    type: USER_LOGIN_ERROR,
    payload,
  };
};

export const landingPageErrorResolve = () => {
  return {
    type: LANDING_PAGE_ERROR_RESOLVE,
  };
};

export const getProfile = () => {
  return {
    type: GET_PROFILE,
  };
};

export const getProfileSuccess = () => {
  return {
    type: GET_PROFILE_SUCCESS,
  };
};

export const getProfileError = () => {
  return {
    type: GET_PROFILE_ERROR,
  };
};

export const toggleAddCoursesModal = () => {
  return {
    type: TOGGLE_ADD_COURSES,
  };
};

export const setCourses = payload => {
  return {
    type: SET_COURSES,
    payload,
  };
};

export const updateUser = (field, data) => {
  return {
    type: UPDATE_USER,
    field,
    data,
  };
};

export const addCourses = () => {
  return {
    type: ADD_COURSES,
  };
};

export const addCoursesSuccess = () => {
  return {
    type: ADD_COURSES_SUCCESS,
  };
};

export const addCoursesError = () => {
  return {
    type: ADD_COURSES_ERROR,
  };
};

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const loadCourses = () => ({
  type: LOAD_COURSES,
});

export const loadCoursesSuccess = () => ({
  type: LOAD_COURSES_SUCCESS,
});

export const loadCoursesError = () => ({
  type: LOAD_COURSES_ERROR,
});
