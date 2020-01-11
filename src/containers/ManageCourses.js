import React from 'react';
import { connect } from 'react-redux';

import {
  toggleAddCoursesModal,
  updateUser,
  addCourses,
  addCoursesSuccess,
  addCoursesError,
} from '../actions';
import ManageCourses from '../components/ManageCourses';
import { addUserCourses } from '../utils/api';

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

  const addCourses = async courseData => {
    onAddCourses();
    try {
      const updatedCourses = await addUserCourses(courseData);
      onUpdateUser('currentCourses', updatedCourses);
      onAddCoursesSuccess();
    } catch (err) {
      console.log(err);
      onAddCoursesError();
    }
  };

  const manageCourseProps = !user
    ? null
    : {
        currentCourses: user.currentCourses,
        previousCourses: user.previousCourses,
        open: isAddCoursesOpen,
        toggleModal: onToggleAddCourses,
        allCourses,
        addCourses,
        loading: isAddCoursesLoading,
      };

  return user && <ManageCourses {...manageCourseProps} />;
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
