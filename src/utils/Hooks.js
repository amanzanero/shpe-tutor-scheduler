import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  setUser,
  getProfile,
  getProfileError,
  getProfileSuccess,
  setCourses,
} from '../actions';
import { fetchProfile, fetchAllCourses } from './api';

/**
 * Fetch user hook
 * * fetches user or redirects to home
 */
export const useFetchUser = props => {
  const dispatch = useDispatch();
  const onSetUser = payload => dispatch(setUser(payload));
  const onGetProfile = () => dispatch(getProfile());
  const onGetProfileSuccess = () => dispatch(getProfileSuccess());
  const onGetProfileError = () => dispatch(getProfileError());

  const { isLoading, user } = useSelector(({ globalStore, homePage }) => ({
    isLoading: homePage.loading,
    user: globalStore.user,
  }));

  const history = useHistory();

  useEffect(() => {
    const loadUser = async () => {
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
    };
    if (!user && !isLoading) loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return { isLoading, user };
};

export const useFetchClasses = props => {
  const dispatch = useDispatch();
  const onSetCourses = payload => dispatch(setCourses(payload));

  const { isLoading, user, allCourses } = useSelector(
    ({ globalStore, homePage }) => ({
      isLoading: homePage.loading,
      allCourses: globalStore.courses,
    }),
  );

  useEffect(() => {
    const loadCourses = async () => {
      if (allCourses.length === 0 && !isLoading) {
        try {
          const courses = await fetchAllCourses();
          onSetCourses(courses);
        } catch (err) {
          console.log(err);
        }
      }
    };
    if (!user && !isLoading) loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return { isLoading, courses: allCourses };
};
