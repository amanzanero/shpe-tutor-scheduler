import React from 'react';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PlusIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ListDividers = ({ courses, onClick, courseHash }) => {
  const classes = useStyles();
  return (
    <List
      component="nav"
      className={`${classes.root}`}
      aria-label="mailbox folders"
    >
      {courses.map((course, index) => {
        return (
          <React.Fragment key={courseHash(course)}>
            <Divider />
            <ListItem className={classes.nested}>
              <ListItemText>
                <Typography variant={'body1'}>{courseHash(course)}</Typography>
              </ListItemText>
              <Button
                name={courseHash(course)}
                onClick={() =>
                  onClick({
                    school: course.school,
                    index: index,
                    text: courseHash(course),
                  })
                }
                variant="outlined"
                key={index}
                id={index}
              >
                <PlusIcon name={courseHash(course)} />
              </Button>
            </ListItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default ListDividers;
