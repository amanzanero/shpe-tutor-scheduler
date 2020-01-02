import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/MinimizeRounded';
import MuiDialogActions from '@material-ui/core/DialogActions';

import { DialogContent, DialogTitle } from '../DialogCompose';
import ListDividers from '../ListDivider';
import NestedList from '../NestedList';
import Chips from './Chips';

export default function ManageCourses(props) {
  const { currentCourses, open, toggleModal, allCourses } = props;
  const initialState = Object.keys(allCourses).reduce(
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
  const courseHash = course => {
    return `${course.school}-${course.number}`;
  };

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

  function stageCourse(school, index) {
    const course = allCourses[school][index];
    var exists = false;
    stagedCourses.forEach(curr => {
      if (courseHash(curr) === courseHash(course)) exists = true;
    });
    if (exists) return;
    toggleStagedCourse(prev => [...prev, course]);
  }

  function unstageCourse(course) {
    toggleStagedCourse(prevState => {
      return prevState.filter(item => courseHash(item) !== courseHash(course));
    });
  }

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
        {Object.keys(allCourses).length > 0 && (
          <Chips
            staged={stagedCourses}
            remove={unstageCourse}
            courseHash={courseHash}
          />
        )}
        <DialogContent>
          <Collapse in={courseAdd} unmountOnExit>
            {Object.keys(allCourses).length > 0 &&
              Object.keys(allCourses).map(school => {
                const nestedOpen = getNestedOpen(school);
                return (
                  <React.Fragment key={school}>
                    <NestedList
                      onClick={handleMenuClick}
                      name={school}
                      open={nestedOpen}
                    />
                    <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
                      <ListDividers
                        nested={true}
                        courses={allCourses[school]}
                        onClick={stageCourse}
                        courseHash={courseHash}
                      />
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
