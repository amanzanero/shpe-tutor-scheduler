import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import UserNav from '../components/UserNav';
import {
  toggleSettingsModal,
  toggleAddCoursesModal,
  userLogout,
} from '../actions';

export default function Nav({ history }) {
  const dispatch = useDispatch();
  const onToggleModal = useCallback(() => dispatch(toggleSettingsModal()), [
    dispatch,
  ]);
  const onToggleAddCourses = useCallback(
    () => dispatch(toggleAddCoursesModal()),
    [dispatch],
  );
  const onUserLogout = useCallback(() => dispatch(userLogout()), [dispatch]);

  const logOut = () => {
    localStorage.removeItem('id_token');
    onUserLogout();
    history.push('/');
  };

  const navigateHome = () => {
    history.push('/home');
  };

  const navProps = { onToggleModal, logOut, onToggleAddCourses, navigateHome };

  return <UserNav {...navProps} />;
}
