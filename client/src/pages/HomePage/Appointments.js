import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppointmentCard from '../../components/AppointmentCard';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
};

const Appointments = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppointmentCard />
    </div>
  );
};

export default withStyles(styles)(Appointments);
