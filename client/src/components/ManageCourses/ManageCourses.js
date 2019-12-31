import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import CloseIcon from '@material-ui/icons/Close';

import { DialogActions, DialogContent, DialogTitle } from '../DialogCompose';
import ListDividers from '../ListDivider';
import { useButtonStyles } from '../../theme';
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
  const [menuOpen, setOpen] = React.useState(initialState);
  const [courseAdd, setCourseAdd] = React.useState(false);

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

  const classes = useStyles();
  const buttonClass = useButtonStyles();

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
          <Button
            size="medium"
            variant="contained"
            fullWidth
            className={buttonClass.root}
            onClick={handleCourseAddClose}
          >
            {!courseAdd ? (
              <React.Fragment>
                ADD
                <PlusIcon />
              </React.Fragment>
            ) : (
              <React.Fragment>
                CLOSE
                <CloseIcon />
              </React.Fragment>
            )}
          </Button>
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
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
