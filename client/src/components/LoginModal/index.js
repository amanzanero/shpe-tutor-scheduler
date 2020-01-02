import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1.5em',
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
  const { onToggleModal, open, classes, onSubmitLogin } = props;

  const [emailState, setEmail] = useState('');
  const [passwordState, setPassword] = useState('');

  const stateMap = {
    email: emailState,
    password: passwordState,
  };

  const setStateMap = {
    email: setEmail,
    password: setPassword,
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => onToggleModal()}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.titleContainer}>
          <Typography variant="h4" className={classes.title}>
            Login
          </Typography>
        </div>
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
              value={stateMap[cont.type]}
              onChange={e => setStateMap[cont.type](e.target.value)}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onSubmitLogin({ emailState, passwordState })}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FormDialog.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  onSubmitLogin: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(FormDialog);
