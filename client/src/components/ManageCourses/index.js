import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import MuiDialogActions from '@material-ui/core/DialogActions';

import { DialogContent, DialogTitle } from '../DialogCompose';
import ListDividers from '../ListDivider';
import NestedList from '../NestedList';
import Chips from './Chips';

export default function ManageCourses(props) {
  const { currentCourses, open, toggleModal, allCourses, addCourses } = props;
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
  const courseHash = course => `${course.school}-${course.number}`;
  const handleMenuClick = name => {
    const target = `${name}_open`;
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

  const courseComp = (c1, c2) =>
    c1.school === c2.school && c1.index === c2.index;

  function stageCourse(courseInfo) {
    var exists = false;
    stagedCourses.forEach(curr => {
      if (courseComp(curr, courseInfo)) exists = true;
    });
    if (exists) return;
    toggleStagedCourse(prev => [...prev, courseInfo]);
  }

  function unstageCourse(course) {
    toggleStagedCourse(prevState => {
      return prevState.filter(item => !courseComp(course, item));
    });
  }

  async function onSave() {
    if (stagedCourses.length === 0) return;
    const courseData = stagedCourses.reduce((prev, curr) => {
      const course = allCourses[curr.school][curr.index];
      return [...prev, course._id];
    }, []);
    await addCourses(courseData);
    handleClose();
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
            hash={courseHash}
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
                        clickable
                        hash={courseHash}
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
              <ListDividers courses={currentCourses} hash={courseHash} />
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
                onClick={onSave}
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
