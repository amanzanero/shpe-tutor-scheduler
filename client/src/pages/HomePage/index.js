import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserNav from '../../components/UserNav';
import {
  toggleSettingsModal,
  setUser,
  getProfile,
  getProfileError,
  getProfileSuccess,
} from '../../actions';
import SettingsModal from '../../components/SettingsModal';
import Appointments from './Appointments';
import baseUrl from '../../config/config';

const styles = {
  root: {
    background: '#e8e8e8',
    flex: 1,
    padding: '1em',
  },
  linearProgress: {
    margin: '0 auto',
  },
};

const HomePage = props => {
  const {
    classes,
    onToggleModal,
    isModalOpen,
    onGetProfile,
    onSetUser,
    onGetProfileSuccess,
    onGetProfileError,
    history,
    isLoading,
  } = props;

  const navProps = { onToggleModal, isModalOpen };
  const modalProps = { onToggleModal, isModalOpen };

  useEffect(() => {
    const authorize = async () => {
      onGetProfile();
      const token = localStorage.getItem('id_token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/api/user/profile`, { headers })
        .then(resp => {
          onSetUser(resp.data.data);
          onGetProfileSuccess();
        })
        .catch(err => {
          console.log(err);
          onGetProfileError();
          history.push('/');
        });
    };
    authorize();
  }, []);

  return (
    <React.Fragment>
      <UserNav {...navProps} />
      {isLoading && <CircularProgress className={classes.linearProgress} />}

      <SettingsModal {...modalProps} />
      <div className={classes.root}>
        <Appointments />
      </div>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onToggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ globalStore, homePage }) => {
  return {
    isModalOpen: homePage.settingsOpen,
    isLoading: homePage.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleModal: () => dispatch(toggleSettingsModal()),
    onSetUser: payload => dispatch(setUser(payload)),
    onGetProfile: () => dispatch(getProfile()),
    onGetProfileSuccess: () => dispatch(getProfileSuccess()),
    onGetProfileError: () => dispatch(getProfileError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(HomePage));
