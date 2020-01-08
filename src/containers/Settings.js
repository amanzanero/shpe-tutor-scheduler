import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SettingsModal from '../components/SettingsModal';
import { toggleSettingsModal } from '../actions';

function Settings(props) {
  const dispatch = useDispatch();
  const onToggleModal = useCallback(() => dispatch(toggleSettingsModal()), [
    dispatch,
  ]);

  const { isModalOpen, user } = useSelector(({ globalStore, homePage }) => ({
    isModalOpen: homePage.settingsOpen,
    user: globalStore.user,
  }));

  const modalProps = { onToggleModal, isModalOpen, user };

  return <SettingsModal {...modalProps} />;
}

export default Settings;
