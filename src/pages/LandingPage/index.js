import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';

import ErrorPopUp from '../../components/ErrorPopUp';
import LandingNav from '../../components/LandingNav';
import LoginModal from '../../components/LoginModal';
import RegistrationForm from './RegistrationForm';

import {
  toggleLoginModal,
  userRegister,
  userRegisterSuccess,
  userRegisterError,
  userRegistrationErrorResolve,
  userLogin,
  userLoginError,
  userLoginSuccess,
} from '../../actions';
import { registerUser, loginUser } from '../../utils/api';

const styles = {
  root: {
    background: '#e8e8e8',
    flex: 1,
  },
  pageBody: {
    padding: '1em',
  },
  linearProgress: {
    margin: '.5em',
  },
};

function LandingPage(props) {
  const {
    classes,
    isModalOpen,
    onToggleModal,
    isLoading,
    onRegisterUser,
    onRegisterUserError,
    onRegisterUserSuccess,
    onLoginUser,
    onLoginUserError,
    onLoginUserSuccess,
    onErrResolve,
    hasError,
    errMessage,
  } = props;
  let history = useHistory();

  const onFormSubmit = async state => {
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

  const onSubmitLogin = async ({ emailState, passwordState }) => {
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

  const loginProps = {
    onToggleModal,
    open: isModalOpen,
    onSubmitLogin,
  };

  return (
    <div className={classes.root}>
      <LandingNav onToggleModal={onToggleModal} />
      {isLoading && <LinearProgress className={classes.linearProgress} />}
      <LoginModal {...loginProps} />
      <div className={classes.pageBody}>
        <RegistrationForm onFormSubmit={onFormSubmit} />
      </div>
      <ErrorPopUp
        hasError={hasError}
        onErrResolve={onErrResolve}
        errMessage={errMessage}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isModalOpen: state.landingPage.modalOpen,
    isLoading: state.landingPage.loading,
    hasError: state.landingPage.pageErr.status,
    errMessage: state.landingPage.pageErr.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleModal: () => dispatch(toggleLoginModal()),
    onRegisterUser: () => dispatch(userRegister()),
    onRegisterUserSuccess: () => dispatch(userRegisterSuccess()),
    onRegisterUserError: payload => dispatch(userRegisterError(payload)),
    onErrResolve: () => dispatch(userRegistrationErrorResolve()),
    onLoginUser: payload => dispatch(userLogin(payload)),
    onLoginUserSuccess: () => dispatch(userLoginSuccess()),
    onLoginUserError: payload => dispatch(userLoginError(payload)),
  };
};

LandingPage.defaultProps = {
  errMessage: '',
};

LandingPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  onRegisterUser: PropTypes.func.isRequired,
  onRegisterUserSuccess: PropTypes.func.isRequired,
  onRegisterUserError: PropTypes.func.isRequired,
  onLoginUser: PropTypes.func.isRequired,
  onLoginUserError: PropTypes.func.isRequired,
  onLoginUserSuccess: PropTypes.func.isRequired,
  onErrResolve: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  errMessage: PropTypes.string,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(LandingPage));
