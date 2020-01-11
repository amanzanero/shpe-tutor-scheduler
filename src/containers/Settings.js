import React from 'react';
import { connect } from 'react-redux';

import SettingsModal from '../components/SettingsModal';
import { toggleSettingsModal } from '../actions';

function Settings(props) {
  const { onToggleModal, isModalOpen, user } = props;
  const modalProps = { onToggleModal, isModalOpen, user };

  return <SettingsModal {...modalProps} />;
}

const mapStateToProps = ({ globalStore, homePage }) => {
  return {
    isModalOpen: homePage.settingsOpen,
    user: globalStore.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleModal: () => dispatch(toggleSettingsModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
