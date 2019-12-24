import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import AddCourse from './AddCourse';
import AppointmentCard from '../../components/AppointmentCard';
import theme, { button } from '../../theme';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button,
  header: {
    margin: '0.5em',
    color: theme.palette.primary.main,
  },
};

const Appointments = props => {
  const {
    classes,
    appts,
    courses,
    onToggleAddCourses,
    isAddCoursesOpen,
  } = props;

  const hasCourses = courses && courses.length > 0;
  const NoApptsButton = () => {
    let text = hasCourses ? 'Book an appointment' : 'Add courses';

    return (
      <Button
        size="medium"
        variant="contained"
        className={classes.button}
        onClick={() => onToggleAddCourses()}
      >
        {text}
      </Button>
    );
  };

  return (
    <div className={classes.root}>
      {!appts || appts.length === 0 ? (
        <React.Fragment>
          <Typography className={classes.header} variant="h5">
            {!hasCourses ? 'You need to add courses!' : 'No appointments!'}
          </Typography>
          <NoApptsButton />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography className={classes.header} variant="h5">
            Your upcoming appointments
          </Typography>
          {appts.map(appt => (
            <AppointmentCard appt={appt} />
          ))}
        </React.Fragment>
      )}
      <AddCourse open={isAddCoursesOpen} toggleModal={onToggleAddCourses} />
    </div>
  );
};

export default withStyles(styles)(Appointments);
