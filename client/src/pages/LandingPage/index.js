import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LandingNav from '../../components/LandingNav';
import LoginModal from '../../components/LoginModal';
import RegistrationForm from './RegistrationForm';

import { toggleModal } from '../../actions';

const styles = {
  root: {
    background: '#e8e8e8',
    flex: 1,
  },
  pageBody: {
    padding: '1em',
  },
};

function LandingPage(props) {
  const { classes, isModalOpen, onToggleModal } = props;
  return (
    <div className={classes.root}>
      <LandingNav onToggleModal={onToggleModal} />
      <LoginModal onToggleModal={onToggleModal} open={isModalOpen} />
      <div className={classes.pageBody}>
        <RegistrationForm open={isModalOpen} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { isModalOpen: state.landingPage.modalOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleModal: () => dispatch(toggleModal()),
  };
};

LandingPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(LandingPage));
