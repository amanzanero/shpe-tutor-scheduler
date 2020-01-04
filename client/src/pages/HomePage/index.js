import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import UserNav from '../../components/UserNav';
import SettingsModal from '../../components/SettingsModal';
import Appointments from './Appointments';
import ManageCourses from '../../components/ManageCourses';
import UserCourses from './UserCourses';
import ProgressCircle from '../../components/ProgressCircle';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    padding: '1em',
    justifyContent: 'center',
  },
  background: {
    background: '#e8e8e8',
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
    <ProgressCircle />
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

export default HomePage;
