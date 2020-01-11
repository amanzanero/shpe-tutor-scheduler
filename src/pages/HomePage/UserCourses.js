import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ClassCard from '../../components/ClassCard';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  text: {
    color: 'white',
    marginBottom: theme.spacing(1),
  },
  paper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
  },
}));

export default function UserCourses({ courses }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.text} variant="h4">
          My Courses:
        </Typography>
        <Grid container spacing={2}>
          {courses.map(course => {
            const { school, number, name } = course;
            const text = `${school}-${number}`;
            return (
              <Grid item xs={6} sm={3} key={text}>
                <ClassCard heading={text} subHeading={name} />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </div>
  );
}
