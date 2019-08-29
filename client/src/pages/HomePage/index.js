import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import UserNav from '../../components/UserNav';

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
  const { classes } = props;
  return (
    <React.Fragment>
      <UserNav />
      <div className={classes.root} />
    </React.Fragment>
  );
};

HomePage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(HomePage);
