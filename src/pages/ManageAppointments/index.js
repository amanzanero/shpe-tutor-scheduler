import React from 'react';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import { useFetchUser } from '../../Hooks';
import ProgressCircle from '../../components/ProgressCircle';

export default function ManageAppointments() {
  // The first commit of Material-UI
  const { isLoading } = useFetchUser();

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  // const { appointments, currentCourses } = user;
  const handleDateChange = date => {
    setSelectedDate(date);
    console.log(date);
  };

  return isLoading ? (
    <ProgressCircle />
  ) : (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container justify="space-around">
        <Button>hi</Button>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/DD/YYYY"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
