import { useDispatch, useSelector } from 'react-redux';

import {
  addCourses,
  addCoursesError,
  addCoursesSuccess,
  updateUser,
} from '../actions';
import { addUserCourses } from '../utils/api';

/**
 * Fetch courses hook
 * * fetches all available courses
 */
const useAddCourses = () => {
  const dispatch = useDispatch();
  const onUpdateUser = payload => dispatch(updateUser(payload));
  const onAddCourses = payload => dispatch(addCourses(payload));
  const onAddCoursesSuccess = payload => dispatch(addCoursesSuccess(payload));
  const onAddCoursesError = payload => dispatch(addCoursesError(payload));

  const { isLoading } = useSelector(({ homePage }) => ({
    isLoading: homePage.manageCoursesLoading,
  }));

  const updateUserCourses = async courseData => {
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

  return { addCoursesLoading: isLoading, userAddCourses: updateUserCourses };
};

export default useAddCourses;
