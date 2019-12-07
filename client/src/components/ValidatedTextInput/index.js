/**
 * Standard Validated Text Field
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { textField as styles } from '../../theme';

const ValidatedTextField = props => {
  const {
    classes,
    textContent,
    handleChange,
    val,
    onBlur,
    valid,
    error_text,
    type,
  } = props;
  return (
    <TextField
      label={textContent.text}
      className={classes.textField}
      fullWidth
      type={type ? type : null}
      margin="normal"
      variant="outlined"
      error={!valid}
      helperText={!valid ? error_text : ''}
      value={val}
      onChange={handleChange}
      name={textContent.stateSlug}
      key={textContent.stateSlug}
      onBlur={onBlur}
    />
  );
};

ValidatedTextField.defaultProps = {
  valid: true,
};

ValidatedTextField.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  textContent: PropTypes.objectOf(PropTypes.any).isRequired,
  val: PropTypes.string.isRequired,
  valid: PropTypes.bool,
  type: PropTypes.any,
};

export default withStyles(styles)(ValidatedTextField);
