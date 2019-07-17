import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import axios from 'axios';
import LandingNav from '../../components/LandingNav';
import LoginModal from '../../components/LoginModal';
import RegistrationForm from './RegistrationForm';

import {
  toggleModal,
  userRegister,
  userRegisterSuccess,
  userRegisterError,
  setUser,
} from '../../actions';

const styles = {
  root: {
    background: '#e8e8e8',
    flex: 1,
  },
  pageBody: {
    padding: '1em',
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
    onSetUser,
  } = props;

  const onFormSubmit = state => {
    onRegisterUser();
    const data = {
      name: state.name_field,
      email: state.email_field,
      password: state.password_field,
    };
    axios
      .post('http://localhost:4000/api/user/register', data)
      .then(resp => {
        onSetUser(resp);
        onRegisterUserSuccess();
      })
      .catch(err => onRegisterUserError(err));
  };

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div className={classes.root}>
      <LandingNav onToggleModal={onToggleModal} />
      <LoginModal onToggleModal={onToggleModal} open={isModalOpen} />
      <div className={classes.pageBody}>
        <RegistrationForm onFormSubmit={onFormSubmit} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isModalOpen: state.landingPage.modalOpen,
    isLoading: state.landingPage.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleModal: () => dispatch(toggleModal()),
    onRegisterUser: payload => dispatch(userRegister(payload)),
    onRegisterUserSuccess: () => dispatch(userRegisterSuccess()),
    onRegisterUserError: payload => dispatch(userRegisterError(payload)),
    onSetUser: payload => dispatch(setUser(payload)),
  };
};

LandingPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  onRegisterUser: PropTypes.func.isRequired,
  onRegisterUserSuccess: PropTypes.func.isRequired,
  onRegisterUserError: PropTypes.func.isRequired,
  onSetUser: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(LandingPage));
