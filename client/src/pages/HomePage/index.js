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
  setCourses,
} from '../../actions';
import SettingsModal from '../../components/SettingsModal';
import Appointments from './Appointments';
import ManageCourses from '../../components/ManageCourses';
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

const token = localStorage.getItem('id_token');
const headers = {
  Authorization: `Bearer ${token}`,
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
    user,
    onToggleAddCourses,
    isAddCoursesOpen,
    onSetCourses,
    allCourses,
  } = props;

  // first check if user is authorized
  useEffect(() => {
    const authorize = async () => {
      onGetProfile();
      await axios
        .get(`${baseUrl}/user/profile`, { headers })
        .then(resp => {
          onSetUser(resp.data.data);
          onGetProfileSuccess();
        })
        .catch(err => {
          console.log(err);
          onGetProfileError();
          history.push('/');
        });
      if (allCourses.length === 0)
        await axios
          .get(`${baseUrl}/course/current`, { headers })
          .then(response => {
            const { courses } = response.data.data;
            onSetCourses(courses);
          });
    };
    authorize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    localStorage.removeItem('id_token');
    history.push('/');
  };

  const addCourses = async courseData => {
    try {
      const response = await axios.put(
        `${baseUrl}/course/userCurrent`,
        {
          courseIDs: courseData,
        },
        { headers },
      );
      console.log(response.data);
    } catch (err) {
      const { response } = err;
      console.log(response);
    }
  };

  const navProps = { onToggleModal, isModalOpen, logOut, onToggleAddCourses };
  const modalProps = { onToggleModal, isModalOpen, user };
  const apptProps = {
    appts: user ? user.appointments : null,
    role: user ? user.role : null,
    courses: user ? user.currentCourses : null,
    onToggleAddCourses,
  };
  const manageCourseProps = {
    currentCourses: user.currentCourses,
    previousCourses: user.previousCourses,
    open: isAddCoursesOpen,
    toggleModal: onToggleAddCourses,
    allCourses,
    addCourses,
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
        <Appointments {...apptProps} />
        <ManageCourses {...manageCourseProps} />
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
    allCourses: globalStore.courses,
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
    onSetCourses: payload => dispatch(setCourses(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(HomePage));
