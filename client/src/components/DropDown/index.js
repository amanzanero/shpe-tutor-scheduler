import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { textField } from '../../theme';

const styles = {
  root: textField.textField,
};

const DropDown = props => {
  const { classes, dropDown, handleDropDown, options, label, name } = props;
  return (
    <TextField
      className={classes.root}
      fullWidth
      select
      margin="normal"
      variant="outlined"
      label={label}
      value={dropDown}
      name={name}
      onChange={handleDropDown}
    >
      {options.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

DropDown.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleDropDown: PropTypes.func.isRequired,
  dropDown: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(DropDown);
