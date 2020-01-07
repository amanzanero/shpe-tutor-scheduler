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
import { fetchProfile, fetchAllCourses } from '../utils/api';

export default function useUser(props) {
  const dispatch = useDispatch();
  const {
    onGetProfile,
    onSetUser,
    onGetProfileSuccess,
    onGetProfileError,
    onSetCourses,
  } = {
    onSetUser: payload => dispatch(setUser(payload)),
    onGetProfile: () => dispatch(getProfile()),
    onGetProfileSuccess: () => dispatch(getProfileSuccess()),
    onGetProfileError: () => dispatch(getProfileError()),
    onSetCourses: payload => dispatch(setCourses(payload)),
  };

  const { isLoading, user, allCourses } = useSelector(
    ({ globalStore, homePage }) => ({
      isLoading: homePage.loading,
      user: globalStore.user,
      allCourses: globalStore.courses,
    }),
  );

  const history = useHistory();

  useEffect(() => {
    const pageLoad = async () => {
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
    };
    pageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, user, allCourses };
}
