import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LandingNav from '../../components/LandingNav';
import RegistrationForm from './RegistrationForm';

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
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LandingNav />
      <div className={classes.pageBody}>
        <RegistrationForm />
      </div>
    </div>
  );
}

LandingPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(LandingPage);
