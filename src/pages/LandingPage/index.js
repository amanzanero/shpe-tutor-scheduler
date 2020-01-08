import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

import ErrorPopUp from '../../components/ErrorPopUp';
import LandingNav from '../../components/LandingNav';
import LoginModal from '../../components/LoginModal';
import RegistrationForm from './RegistrationForm';

import { toggleLoginModal, landingPageErrorResolve } from '../../actions';
import { useLogin, useRegister } from '../../Hooks';

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
  const { classes } = props;

  const dispatch = useDispatch();
  const onToggleModal = () => dispatch(toggleLoginModal());
  const onErrResolve = () => dispatch(landingPageErrorResolve());

  const isModalOpen = useSelector(({ landingPage }) => landingPage.modalOpen);

  const {
    isLoading: loginLoading,
    onLogin,
    loginError,
    loginErrorMessage,
  } = useLogin();

  const {
    isLoading: registerLoading,
    onRegister,
    registerError,
    registerErrorMessage,
  } = useRegister();

  const loginProps = {
    onToggleModal,
    open: isModalOpen,
    onSubmitLogin: onLogin,
  };

  const isLoading = loginLoading || registerLoading;

  return (
    <div className={classes.root}>
      <LandingNav onToggleModal={onToggleModal} />
      {isLoading && <LinearProgress className={classes.linearProgress} />}
      <LoginModal {...loginProps} />
      <div className={classes.pageBody}>
        <RegistrationForm onFormSubmit={onRegister} />
      </div>
      <ErrorPopUp
        hasError={registerError || loginError}
        onErrResolve={onErrResolve}
        errMessage={registerErrorMessage || loginErrorMessage}
      />
    </div>
  );
}

export default withStyles(styles)(LandingPage);
