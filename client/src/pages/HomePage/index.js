import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserNav from '../../components/UserNav';
import SettingsModal from '../../components/SettingsModal';
import Appointments from './Appointments';
import ManageCourses from '../../components/ManageCourses';
import UserCourses from './UserCourses';

const useStyles = makeStyles(theme => ({
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
}));

const HomePage = props => {
  const {
    onToggleModal,
    isModalOpen,
    isLoading,
    user,
    onToggleAddCourses,
    isAddCoursesLoading,
    isAddCoursesOpen,
    allCourses,
    addCourses,
    logOut,
  } = props;

  const classes = useStyles();

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
    loading: isAddCoursesLoading,
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
        <UserCourses courses={user.currentCourses} />
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

export default HomePage;
