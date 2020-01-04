import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progressCircle: {
    color: theme.palette.primary.main,
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
}));

export default function ProgressCircle() {
  const classes = useStyles();
  return (
    <div className={`${classes.progressContainer} ${classes.background}`}>
      <CircularProgress className={classes.linearProgress} size={100} />
    </div>
  );
}
