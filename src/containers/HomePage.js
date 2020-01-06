import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  setUser,
  getProfile,
  getProfileError,
  getProfileSuccess,
  toggleAddCoursesModal,
  setCourses,
} from '../actions';
import { fetchProfile, fetchAllCourses } from '../utils/api';

import HomePageComp from '../pages/HomePage';

function HomePage(props) {
  const {
    onGetProfile,
    onSetUser,
    onGetProfileSuccess,
    onGetProfileError,
    isLoading,
    user,
    onToggleAddCourses,
    onSetCourses,
    allCourses,
  } = props;

  let history = useHistory();

  const pageLoad = async () => {
    onGetProfile();
    try {
      const usr = await fetchProfile();
      onGetProfileSuccess();
      onSetUser(usr);
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
  };

  if (!user) pageLoad();

  const homePageProps = { isLoading, user, onToggleAddCourses };

  return <HomePageComp {...homePageProps} />;
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
    onToggleAddCourses: () => dispatch(toggleAddCoursesModal()),
    onSetCourses: payload => dispatch(setCourses(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
