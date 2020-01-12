import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Appointments from './Appointments';
import UserCourses from './UserCourses';
import CourseOptions from './CourseOptions';
import ProgressCircle from '../../components/ProgressCircle';
import { useFetchUser } from '../../Hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleAddCoursesModal,
  openCourseOptions,
  closeCourseOptions,
} from '../../actions';
import { on } from 'nodemon';

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
  const classes = useStyles();
  const { isLoading, user } = useFetchUser();
  const { selectedCourse, isCourseOptionsOpen } = useSelector(
    ({ homePage }) => ({
      selectedCourse: homePage.courseOptions.course,
      isCourseOptionsOpen: homePage.courseOptions.open,
    }),
  );
  const dispatch = useDispatch();
  const onToggleAddCourses = useCallback(
    () => dispatch(toggleAddCoursesModal()),
    [dispatch],
  );
  const onOpenCourseOptions = useCallback(
    payload => dispatch(openCourseOptions(payload)),
    [dispatch],
  );
  const onCloseCourseOptions = useCallback(
    () => dispatch(closeCourseOptions()),
    [dispatch],
  );

  const apptProps = {
    appts: user ? user.appointments : null,
    role: user ? user.role : null,
    courses: user ? user.currentCourses : null,
    onToggleAddCourses,
  };

  const courseOptionProps = {
    onClose: onCloseCourseOptions,
    course: selectedCourse,
    open: isCourseOptionsOpen,
  };

  return isLoading ? (
    <ProgressCircle />
  ) : (
    user && (
      <div className={`${classes.root} ${classes.background}`}>
        <Appointments {...apptProps} />
        <UserCourses
          courses={user.currentCourses}
          openModal={onOpenCourseOptions}
        />
        <CourseOptions {...courseOptionProps} />
      </div>
    )
  );
};

export default HomePage;
