import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import { textField } from '../theme';
import ValidatedTextInput from './ValidatedTextInput';
import DropDown from './DropDown';
import MAJORS from '../config/majors';

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

function SettingsModal(props) {
  const fieldState = FIELDS.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.stateSlug]: '',
    }),
    {},
  );
  const dropDownState = DROPDOWNS.reduce(
    (prev, curr) => ({ ...prev, [curr.name]: '' }),
    {},
  );

  const initialState = {
    ...fieldState,
    ...dropDownState,
  };

  const [field, setField] = useState(initialState);

  const handleChange = event => {
    setField(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDropDown = event => {
    setField(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const { classes, isModalOpen, onToggleModal } = props;

  return (
    <div>
      <Dialog
        open={isModalOpen}
        onClose={() => onToggleModal()}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.titleContainer}>
          <Typography variant="h4" className={classes.title}>
            User Profile
          </Typography>
        </div>
        <DialogContent>
          {FIELDS.map(textContent => {
            const { [textContent.stateSlug]: val } = field;
            const inputProps = {
              textContent,
              val,
              handleChange: handleChange,
            };
            return (
              <ValidatedTextInput key={textContent.stateSlug} {...inputProps} />
            );
          })}
          {DROPDOWNS.map(item => {
            const { [item.name]: val } = field;
            const dropDownProps = {
              name: item.name,
              options: item.options,
              handleDropDown: handleDropDown,
              label: item.label,
              dropDown: val,
            };
            return <DropDown key={item.name} {...dropDownProps} />;
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => console.log('hi')}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SettingsModal.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  onToggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SettingsModal);
