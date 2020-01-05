import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Appointments from './Appointments';
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

const HomePage = ({ isLoading, user, onToggleAddCourses }) => {
  const classes = useStyles();

  const apptProps = {
    appts: user ? user.appointments : null,
    role: user ? user.role : null,
    courses: user ? user.currentCourses : null,
    onToggleAddCourses,
  };

  return isLoading ? (
    <ProgressCircle />
  ) : (
    user && (
      <div className={`${classes.root} ${classes.background}`}>
        <Appointments {...apptProps} />
        <UserCourses courses={user.currentCourses} />
      </div>
    )
  );
};

export default HomePage;
