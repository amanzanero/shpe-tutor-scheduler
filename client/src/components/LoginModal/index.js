import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    color: theme.palette.primary.main,
  },
  formfield: {
    '& label.Mui-focused': {
      color: theme.palette.secondary.light,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.light,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
});

const FIELDS = [
  {
    label: 'Email Address',
    type: 'email',
  },
  {
    label: 'Password',
    type: 'password',
  },
];
const FormDialog = props => {
  const { onToggleModal, open, classes } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => onToggleModal()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.titleContainer}>
          <Typography variant="h4" className={classes.title}>
            Login
          </Typography>
        </DialogTitle>
        <DialogContent>
          {FIELDS.map(cont => (
            <TextField
              autoFocus
              className={classes.formfield}
              key={cont.label}
              margin="normal"
              label={cont.label}
              type={cont.type}
              fullWidth
              id="outlined-dense"
              variant="outlined"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FormDialog.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(FormDialog);
