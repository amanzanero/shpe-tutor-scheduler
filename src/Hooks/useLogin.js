import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userLogin, userLoginError, userLoginSuccess } from '../actions';
import { loginUser } from '../utils/api';

const useLogin = () => {
  const dispatch = useDispatch();
  const onLoginUser = payload => dispatch(userLogin(payload));
  const onLoginUserSuccess = () => dispatch(userLoginSuccess());
  const onLoginUserError = payload => dispatch(userLoginError(payload));

  const { isLoading, error, errorMessage } = useSelector(({ landingPage }) => ({
    isLoading: landingPage.loading,
    error: landingPage.loginError.status,
    errorMessage: landingPage.loginError.message,
  }));

  let history = useHistory();

  const onLogin = async ({ emailState, passwordState }) => {
    onLoginUser();
    const data = {
      email: emailState,
      password: passwordState,
    };
    try {
      await loginUser(data);
      onLoginUserSuccess();
      history.push('/home');
    } catch (err) {
      onLoginUserError(err.message);
    }
  };

  return {
    isLoading,
    onLogin,
    loginError: error,
    loginErrorMessage: errorMessage,
  };
};

export default useLogin;
