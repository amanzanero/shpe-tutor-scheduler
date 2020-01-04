import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import MuiDialogActions from '@material-ui/core/DialogActions';

import { DialogContent, DialogTitle } from '../../components/DialogCompose';
import ListDividers from '../../components/ListDivider';
import NestedList from '../../components/NestedList';
import Chips from '../../components/Chips';
import ProgressCircle from '../../components/ProgressCircle';

export default function ManageCourses(props) {
  const { open, toggleModal, allCourses, addCourses, loading } = props;
  const initialState = Object.keys(allCourses).reduce(
    (prev, curr) => ({
      ...prev,
      [`${curr}_open`]: false,
    }),
    {},
  );

  const [menuOpen, setOpen] = useState(initialState);
  const [stagedCourses, setStagedCourses] = useState([]);

  const getNestedOpen = course => menuOpen[`${course}_open`];
  const courseHash = course => `${course.school}-${course.number}`;
  const handleMenuClick = name => {
    const target = `${name}_open`;
    setOpen(prev => ({ ...prev, [target]: !prev[target] }));
  };

  function handleClose() {
    toggleModal();
    setOpen(initialState);
  }

  const courseComp = (c1, c2) =>
    c1.school === c2.school && c1.index === c2.index;

  function stageCourse(courseInfo) {
    var exists = false;
    stagedCourses.forEach(curr => {
      if (courseComp(curr, courseInfo)) exists = true;
    });
    if (exists) return;
    setStagedCourses(prev => [...prev, courseInfo]);
  }

  function unstageCourse(course) {
    setStagedCourses(prevState => {
      return prevState.filter(item => !courseComp(course, item));
    });
  }

  async function onSave() {
    if (stagedCourses.length === 0) return;
    const courseData = stagedCourses.reduce((prev, curr) => {
      const course = allCourses[curr.school][curr.index];
      return [...prev, course._id];
    }, []);
    try {
      await addCourses(courseData);
      setStagedCourses([]);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  const modalContent = () =>
    Object.keys(allCourses).length > 0 &&
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
    });

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
          {loading ? <ProgressCircle /> : modalContent()}
        </DialogContent>
        <MuiDialogActions>
          <Button
            size="large"
            onClick={onSave}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Save
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
