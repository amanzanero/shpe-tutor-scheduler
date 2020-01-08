import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCourses } from '../actions';
import { fetchAllCourses } from '../utils/api';

/**
 * Fetch courses hook
 * * fetches all available courses
 */
const useFetchClasses = props => {
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

export default useFetchClasses;
