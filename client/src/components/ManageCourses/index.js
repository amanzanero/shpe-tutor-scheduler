import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/MinimizeRounded';
import MuiDialogActions from '@material-ui/core/DialogActions';

import { DialogContent, DialogTitle } from '../DialogCompose';
import ListDividers from '../ListDivider';
import Chips from './Chips';
import Courses from '../../courses';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  buttonContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function ManageCourses(props) {
  const { currentCourses, open, toggleModal } = props;
  const initialState = Object.keys(Courses).reduce(
    (prev, curr) => ({
      ...prev,
      [`${curr}_open`]: false,
    }),
    {},
  );
  const [menuOpen, setOpen] = useState(initialState);
  const [courseAdd, setCourseAdd] = useState(false);
  const [stagedCourses, toggleStagedCourse] = useState([]);

  const getNestedOpen = course => menuOpen[`${course}_open`];

  const handleMenuClick = e => {
    e.persist();
    const target = `${e.target.getAttribute('name')}_open`;
    setOpen(prev => ({ ...prev, [target]: !prev[target] }));
  };

  function handleClose() {
    setOpen(initialState);
    setCourseAdd(false);
    toggleModal();
  }

  function handleCourseAddClose() {
    setCourseAdd(prev => {
      if (prev) setOpen(initialState);
      return !prev;
    });
  }

  function stageCourse(e) {
    const name = e.target.getAttribute('name');
  }

  function unstageCourse(e) {}

  const classes = useStyles();

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Manage Courses
        </DialogTitle>
        <div className={classes.buttonContainer}>
          <Chips staged={stagedCourses} remove={unstageCourse} />
        </div>
        <DialogContent>
          <Collapse in={courseAdd} unmountOnExit>
            {Object.keys(Courses).map(school => {
              const nestedOpen = getNestedOpen(school);
              return (
                <React.Fragment key={school}>
                  <ListItem button onClick={handleMenuClick} name={school}>
                    <ListItemText primary={school} name={school} />
                    {nestedOpen ? (
                      <ExpandLess name={school} />
                    ) : (
                      <ExpandMore name={school} />
                    )}
                  </ListItem>
                  <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
                    <ListDividers nested={true} courses={Courses[school]} />
                  </Collapse>
                  <Divider />
                </React.Fragment>
              );
            })}
          </Collapse>
        </DialogContent>
        {currentCourses.length > 0 && (
          <React.Fragment>
            <DialogContent dividers>
              <Typography>My classes</Typography>
            </DialogContent>
            <DialogContent dividers>
              <ListDividers courses={currentCourses} />
            </DialogContent>
          </React.Fragment>
        )}
        <MuiDialogActions>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                size="medium"
                variant="outlined"
                fullWidth
                color="primary"
                onClick={handleCourseAddClose}
              >
                {!courseAdd ? <PlusIcon /> : <MinusIcon />}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                size="medium"
                onClick={handleClose}
                variant="outlined"
                color="primary"
                fullWidth
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
