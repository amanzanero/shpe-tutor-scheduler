import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserNav from '../../components/UserNav';
import { toggleSettingsModal } from '../../actions';
import SettingsModal from '../../components/SettingsModal';

const styles = {
  root: {
    background: '#e8e8e8',
    flex: 1,
  },
  pageBody: {
    padding: '1em',
  },
};

const HomePage = props => {
  const { classes, onToggleModal, isModalOpen } = props;

  const navProps = { onToggleModal, isModalOpen };
  const modalProps = { onToggleModal, isModalOpen };

  return (
    <React.Fragment>
      <UserNav {...navProps} />
      <SettingsModal {...modalProps} />
      <div className={classes.root} />
    </React.Fragment>
  );
};

HomePage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onToggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ homePage }) => {
  return {
    isModalOpen: homePage.settingsOpen,
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
)(withStyles(styles)(HomePage));
