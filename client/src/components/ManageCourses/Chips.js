import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips({ staged, remove, courseHash }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {staged.map((course, index) => (
        <Chip
          label={courseHash(course)}
          key={`${course.school}${course.number}${index}`}
          onDelete={() => remove(course)}
        />
      ))}
    </div>
  );
}
