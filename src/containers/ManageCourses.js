import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleAddCoursesModal } from '../actions';
import ManageCourses from '../components/ManageCourses';
import { useFetchCourses } from '../Hooks';
import useAddCourses from '../Hooks/useAddCourses';

function ManageCoursesContainer() {
  const dispatch = useDispatch();
  const onToggleAddCourses = useCallback(
    () => dispatch(toggleAddCoursesModal()),
    [dispatch],
  );

  const { user, isAddCoursesOpen } = useSelector(
    ({ globalStore, homePage }) => ({
      user: globalStore.user,
      isAddCoursesOpen: homePage.addCoursesOpen,
    }),
  );
  const { coursesLoading, allCourses } = useFetchCourses();
  const { addCoursesLoading, addCourses } = useAddCourses();
  const isLoading = coursesLoading || addCoursesLoading;

  const manageCourseProps = !user
    ? null
    : {
        currentCourses: user.currentCourses,
        previousCourses: user.previousCourses,
        open: isAddCoursesOpen,
        toggleModal: onToggleAddCourses,
        allCourses,
        addCourses,
        loading: isLoading,
      };

  return user && <ManageCourses {...manageCourseProps} />;
}

export default ManageCoursesContainer;
