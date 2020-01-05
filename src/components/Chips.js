import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    margin: theme.spacing(2),
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips({ staged, remove, courseHash }) {
  const classes = useStyles();
  const keyHash = (c, i) => `${c.school}${c.number}${i}`;
  return (
    <div className={classes.root}>
      {staged.map((course, index) => (
        <Chip
          label={course.text}
          key={keyHash(course, index)}
          onDelete={() => remove(course)}
        />
      ))}
    </div>
  );
}
