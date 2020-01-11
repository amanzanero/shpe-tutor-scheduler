import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleAddCoursesModal } from '../actions';

import HomePageComp from '../pages/HomePage';
import User from './User';

function HomePage() {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector(({ homePage, globalStore }) => ({
    isLoading: homePage.loading,
    user: globalStore.user,
  }));
  const onToggleAddCourses = useCallback(() => {
    dispatch(toggleAddCoursesModal());
  }, [dispatch]);

  const homePageProps = { isLoading, user, onToggleAddCourses };

  return (
    <User>
      <HomePageComp {...homePageProps} />
    </User>
  );
}

export default HomePage;
