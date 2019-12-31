import React from 'react';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ListDividers = ({ courses, nested }) => {
  const classes = useStyles();

  return (
    <List
      component="nav"
      className={`${classes.root}`}
      aria-label="mailbox folders"
    >
      {courses.map(course => {
        return (
          <React.Fragment key={`${course.dept}-${course.code}`}>
            <ListItem className={`${nested && classes.nested}`}>
              <ListItemText primary={`${course.dept}-${course.code}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default ListDividers;
