import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import baseUrl from '../config/config';
import {
  toggleSettingsModal,
  setUser,
  getProfile,
  getProfileError,
  getProfileSuccess,
  toggleAddCoursesModal,
  setCourses,
  updateUser,
  addCourses,
  addCoursesSuccess,
  addCoursesError,
} from '../actions';

import HomePageComp from '../pages/HomePage';

function HomePage(props) {
  const {
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
    onUpdateUser,
    isAddCoursesLoading,
    onAddCourses,
    onAddCoursesSuccess,
    onAddCoursesError,
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
    onGetProfile();
    try {
      const response = await axios.get(`${baseUrl}/user/profile`, {
        headers,
      });
      onSetUser(response.data.data);
      onGetProfileSuccess();
    } catch (err) {
      console.log(err);
      onGetProfileError();
      history.push('/');
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
    pageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    localStorage.removeItem('id_token');
    history.push('/');
  };

  const addCourses = async courseData => {
    const headers = getAuth();
    onAddCourses();
    try {
      const response = await axios.put(
        `${baseUrl}/course/userCurrent`,
        {
          courseIDs: courseData,
        },
        { headers },
      );
      const { updatedCourses } = response.data;
      onUpdateUser('currentCourses', updatedCourses);
      onAddCoursesSuccess();
    } catch (err) {
      console.log(err);
      onAddCoursesError();
    }
  };

  const homePageProps = {
    onToggleModal,
    isModalOpen,
    isLoading,
    user,
    onToggleAddCourses,
    isAddCoursesOpen,
    allCourses,
    addCourses,
    isAddCoursesLoading,
    logOut,
  };

  return <HomePageComp {...homePageProps} />;
}

const mapStateToProps = ({ globalStore, homePage }) => {
  return {
    isModalOpen: homePage.settingsOpen,
    isLoading: homePage.loading,
    user: globalStore.user,
    isAddCoursesOpen: homePage.addCoursesOpen,
    allCourses: globalStore.courses,
    isAddCoursesLoading: homePage.addCoursesLoading,
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
    onUpdateUser: (field, data) => dispatch(updateUser(field, data)),
    onAddCourses: () => dispatch(addCourses()),
    onAddCoursesSuccess: () => dispatch(addCoursesSuccess()),
    onAddCoursesError: () => dispatch(addCoursesError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
