import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  setUser,
  getProfile,
  getProfileError,
  getProfileSuccess,
} from '../actions';
import { fetchProfile } from '../utils/api';

/**
 * Fetch user hook
 * * fetches user or redirects to home
 */
const useFetchUser = props => {
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

export default useFetchUser;
