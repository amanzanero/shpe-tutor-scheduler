import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  TOGGLE_LOGIN_MODAL,
} from '../types';

export const userRegister = payload => {
  return {
    type: USER_REGISTER,
    payload,
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

export const toggleModal = () => {
  return {
    type: TOGGLE_LOGIN_MODAL,
  };
};
