import React from 'react';
import { connect } from 'react-redux';

import { toggleAddCoursesModal } from '../actions';

import HomePageComp from '../pages/HomePage';
import User from './User';

function HomePage(props) {
  const { isLoading, user, onToggleAddCourses } = props;

  const homePageProps = { isLoading, user, onToggleAddCourses };

  return (
    <User>
      <HomePageComp {...homePageProps} />
    </User>
  );
}

const mapStateToProps = ({ globalStore, homePage }) => {
  return {
    isLoading: homePage.loading,
    user: globalStore.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleAddCourses: () => dispatch(toggleAddCoursesModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
