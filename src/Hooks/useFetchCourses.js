import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCourses,
  loadCourses,
  loadCoursesError,
  loadCoursesSuccess,
} from '../actions';
import { fetchAllCourses } from '../utils/api';

/**
 * Fetch courses hook
 * * fetches all available courses
 */
const useFetchClasses = props => {
  const dispatch = useDispatch();
  const onSetCourses = payload => dispatch(setCourses(payload));
  const onLoadCourses = payload => dispatch(loadCourses(payload));
  const onLoadCoursesSuccess = payload => dispatch(loadCoursesSuccess(payload));
  const onLoadCoursesError = payload => dispatch(loadCoursesError(payload));

  const { isLoading, allCourses, open } = useSelector(
    ({ globalStore, homePage }) => ({
      isLoading: homePage.manageCoursesLoading,
      allCourses: globalStore.courses,
      open: homePage.addCoursesOpen,
    }),
  );

  useEffect(() => {
    const loadCourses = async () => {
      onLoadCourses();
      try {
        const courses = await fetchAllCourses();
        onSetCourses(courses);
        onLoadCoursesSuccess();
      } catch (err) {
        console.log(err);
        onLoadCoursesError();
      }
    };
    if (allCourses.length === 0 && !isLoading && open) loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, open]);

  return { coursesLoading: isLoading, allCourses };
};

export default useFetchClasses;
