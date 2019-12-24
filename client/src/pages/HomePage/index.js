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
  toggleAddCoursesModal,
} from '../../actions';
import SettingsModal from '../../components/SettingsModal';
import Appointments from './Appointments';
import baseUrl from '../../config/config';

const styles = theme => ({
  root: {
    flex: 1,
    padding: '1em',
    justifyContent: 'center',
  },
  background: {
    background: '#e8e8e8',
  },
  progressCircle: {
    color: theme.palette.primary.main,
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
});

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
    user,
    onToggleAddCourses,
    isAddCoursesOpen,
  } = props;

  // first check if user is authorized
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    localStorage.removeItem('id_token');
    history.push('/');
  };

  const navProps = { onToggleModal, isModalOpen, logOut };
  const modalProps = { onToggleModal, isModalOpen };
  const apptProps = {
    appts: user ? user.appointments : null,
    role: user ? user.role : null,
    courses: user ? user.currentCourses : null,
    onToggleAddCourses,
    isAddCoursesOpen,
  };

  return isLoading ? (
    <div className={`${classes.progressContainer} ${classes.background}`}>
      <CircularProgress className={classes.linearProgress} size={100} />
    </div>
  ) : (
    <React.Fragment>
      <UserNav {...navProps} />
      <div className={`${classes.root} ${classes.background}`}>
        <SettingsModal {...modalProps} />
        {(user.role === 'student' || user.role === 'both') && (
          <Appointments {...apptProps} />
        )}
      </div>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onToggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  onGetProfile: PropTypes.func.isRequired,
  onSetUser: PropTypes.func.isRequired,
  onGetProfileSuccess: PropTypes.func.isRequired,
  onGetProfileError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  history: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = ({ globalStore, homePage }) => {
  return {
    isModalOpen: homePage.settingsOpen,
    isLoading: homePage.loading,
    user: globalStore.user,
    isAddCoursesOpen: homePage.addCoursesOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleModal: () => dispatch(toggleSettingsModal()),
    onSetUser: payload => dispatch(setUser(payload)),
    onGetProfile: () => dispatch(getProfile()),
    onGetProfileSuccess: () => dispatch(getProfileSuccess()),
    onGetProfileError: () => dispatch(getProfileError()),
    onToggleAddCourses: () => dispatch(toggleAddCoursesModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(HomePage));
