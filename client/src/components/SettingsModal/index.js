import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import { textField } from '../../theme';
import DropDown from '../DropDown';
import MAJORS from '../../config/majors';

const styles = theme => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1.5em',
  },
  title: {
    color: theme.palette.primary.main,
  },
  formfield: textField.textField,
});

const FIELDS = [
  {
    text: 'Name',
    stateSlug: 'name_field',
  },
  {
    text: 'USC Email',
    stateSlug: 'email_field',
  },
  {
    text: 'Grad Year',
    stateSlug: 'grad_field',
  },
];

const ROLES = ['student', 'tutor', 'both'];

const DROPDOWNS = [
  {
    name: 'major',
    label: 'Major',
    options: MAJORS,
  },
  {
    name: 'role',
    label: 'I am a:',
    options: ROLES,
  },
];

const SettingsModal = props => {
  const { classes, isModalOpen, onToggleModal } = props;

  return (
    <div>
      <Dialog
        open={isModalOpen}
        onClose={onToggleModal}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.titleContainer}>
          <Typography variant="h4" className={classes.title}>
            Login
          </Typography>
        </div>
        <DialogContent>
          {/* {FIELDS.map(cont => (
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
          {DROPDOWNS.map(item => {
            const { [item.name]: val } = this.state;
            const dropDownProps = {
              name: item.name,
              options: item.options,
              handleDropDown: this.handleDropDown,
              label: item.label,
              dropDown: val,
            };
            return <DropDown key={item.name} {...dropDownProps} />;
          })} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => console.log('hi')}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SettingsModal.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  onToggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SettingsModal);
