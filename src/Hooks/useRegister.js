import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  userRegister,
  userRegisterSuccess,
  userRegisterError,
} from '../actions';
import { registerUser } from '../utils/api';

const useRegister = () => {
  const dispatch = useDispatch();
  const onRegisterUser = () => dispatch(userRegister());
  const onRegisterUserSuccess = () => dispatch(userRegisterSuccess());
  const onRegisterUserError = payload => dispatch(userRegisterError(payload));

  const { isLoading, error, errorMessage } = useSelector(({ landingPage }) => ({
    isLoading: landingPage.loading,
    error: landingPage.registerError.status,
    errorMessage: landingPage.registerError.message,
  }));

  let history = useHistory();

  const onRegister = async state => {
    onRegisterUser();
    const data = {
      name: state.name_field_text,
      email: state.email_field_text,
      password: state.password_field_text,
      major: state.major_text,
      role: state.role_text,
      gradYear: state.grad_field_text,
    };
    try {
      await registerUser(data);
      onRegisterUserSuccess();
      history.push('/home');
    } catch (err) {
      onRegisterUserError(err.message);
    }
  };

  return {
    isLoading,
    onRegister,
    registerError: error,
    registerErrorMessage: errorMessage,
  };
};

export default useRegister;
