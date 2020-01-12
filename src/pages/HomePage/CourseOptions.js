import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';

import { DialogTitle } from '../../components/DialogCompose';
import ProgressCircle from '../../components/ProgressCircle';

export default function ManageCourses(props) {
  const { open, onClose, course } = props;

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          Manage Courses
        </DialogTitle>

        <MuiDialogActions>
          <Button
            size="large"
            // onClick={onSave}
            variant="contained"
            color="primary"
            // disabled={loading}
          >
            Save
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
