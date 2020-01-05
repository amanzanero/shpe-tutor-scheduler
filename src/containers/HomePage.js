import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import baseUrl from '../config/config';
import {
  setUser,
  getProfile,
  getProfileError,
  getProfileSuccess,
  toggleAddCoursesModal,
  setCourses,
} from '../actions';

import HomePageComp from '../pages/HomePage';

function HomePage(props) {
  const {
    onGetProfile,
    onSetUser,
    onGetProfileSuccess,
    onGetProfileError,
    history,
    isLoading,
    user,
    onToggleAddCourses,
    onSetCourses,
    allCourses,
  } = props;

  const getAuth = () => {
    const token = localStorage.getItem('id_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return headers;
  };

  const pageLoad = async () => {
    const headers = getAuth();
    try {
      const response = await axios.get(`${baseUrl}/user/profile`, {
        headers,
      });
      onSetUser(response.data.data);
      onGetProfileSuccess();
    } catch (err) {
      console.log('$$$ERROR:', err.message);
      history.push('/');
      onGetProfileError();
      return;
    }
    if (allCourses.length === 0) {
      try {
        const response = await axios.get(`${baseUrl}/course/current`, {
          headers,
        });
        const { courses } = response.data.data;
        onSetCourses(courses);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // first check if user is authorized
  useEffect(() => {
    onGetProfile();
    pageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
