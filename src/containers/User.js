import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  setUser,
  getProfile,
  getProfileError,
  getProfileSuccess,
  setCourses,
} from '../actions';
import { fetchProfile, fetchAllCourses } from '../utils/api';
import ProgressCircle from '../components/ProgressCircle';

function UserContainer(props) {
  const {
    onGetProfile,
    onSetUser,
    onGetProfileSuccess,
    onGetProfileError,
    isLoading,
    user,
    onSetCourses,
    allCourses,
    children,
  } = props;

  let history = useHistory();

  const pageLoad = useCallback(async () => {
    onGetProfile();
    try {
      const usr = await fetchProfile();
      onSetUser(usr);
      onGetProfileSuccess();
    } catch (err) {
      console.log('$$$ERROR:', err.message);
      history.push('/');
      onGetProfileError();
      return;
    }
    if (allCourses.length === 0) {
      try {
        const courses = await fetchAllCourses();
        onSetCourses(courses);
      } catch (err) {
        console.log(err);
      }
    }
  }, [
    allCourses,
    onGetProfile,
    onGetProfileSuccess,
    onSetUser,
    history,
    onGetProfileError,
    onSetCourses,
  ]);

  if (!user && !isLoading) pageLoad();

  return isLoading ? <ProgressCircle /> : children;
}

const mapStateToProps = ({ globalStore, homePage }) => {
  return {
    isLoading: homePage.loading,
    user: globalStore.user,
    allCourses: globalStore.courses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetUser: payload => dispatch(setUser(payload)),
    onGetProfile: () => dispatch(getProfile()),
    onGetProfileSuccess: () => dispatch(getProfileSuccess()),
    onGetProfileError: () => dispatch(getProfileError()),
    onSetCourses: payload => dispatch(setCourses(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserContainer);
