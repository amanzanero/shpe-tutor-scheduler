import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import baseUrl from '../config/config';
import {
  toggleAddCoursesModal,
  updateUser,
  addCourses,
  addCoursesSuccess,
  addCoursesError,
} from '../actions';
import ManageCourses from '../components/ManageCourses';

function ManageCoursesContainer(props) {
  const {
    user,
    onToggleAddCourses,
    isAddCoursesOpen,
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

  const manageCourseProps = {
    currentCourses: user.currentCourses,
    previousCourses: user.previousCourses,
    open: isAddCoursesOpen,
    toggleModal: onToggleAddCourses,
    allCourses,
    addCourses,
    loading: isAddCoursesLoading,
  };

  return <ManageCourses {...manageCourseProps} />;
}

const mapStateToProps = ({ globalStore, homePage }) => {
  return {
    user: globalStore.user,
    isAddCoursesOpen: homePage.addCoursesOpen,
    allCourses: globalStore.courses,
    isAddCoursesLoading: homePage.addCoursesLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleAddCourses: () => dispatch(toggleAddCoursesModal()),
    onUpdateUser: (field, data) => dispatch(updateUser(field, data)),
    onAddCourses: () => dispatch(addCourses()),
    onAddCoursesSuccess: () => dispatch(addCoursesSuccess()),
    onAddCoursesError: () => dispatch(addCoursesError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCoursesContainer);
