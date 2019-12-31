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

export default function Chips({ courses, remove }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {courses.map((course, index) => (
        <Chip
          label={`${course.dept}-${course.code}`}
          key={`${course.dept}${course.code}${index}`}
          onDelete={remove}
        />
      ))}
    </div>
  );
}
