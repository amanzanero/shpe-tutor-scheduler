import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { button, textField } from '../../theme';
import ValidatedTextInput from '../../components/ValidatedTextInput';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    maxWidth: '600px',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    color: theme.palette.primary.main,
  },
  customButton: button,
  customTextField: textField,
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
    text: 'USCID',
    stateSlug: 'id_field',
  },
  {
    text: 'Password',
    stateSlug: 'password_field',
  },
  {
    text: 'Confirm Password',
    stateSlug: 'confirm_field',
  },
];

const ROLES = ['student', 'tutor', 'both'];

const BUTTON_TEXT = 'Submit';

class RegistrationForm extends React.Component {
  state = {
    dropDown: '',
  };

  componentWillMount() {
    FIELDS.forEach(textContent => {
      this.setState(previousState => {
        return {
          ...previousState,
          [textContent.stateSlug]: '',
        };
      });
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleDropDown = event => {
    this.setState({ dropDown: event.target.value });
  };

  render() {
    const { classes, onFormSubmit } = this.props;
    const { dropDown } = this.state;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography className={classes.header} variant="h4">
              Get Started!
            </Typography>
            {FIELDS.map(textContent => {
              const { [textContent.stateSlug]: val } = this.state;
              const inputProps = {
                textContent,
                val,
                handleChange: this.handleChange,
              };
              return (
                <ValidatedTextInput
                  key={textContent.stateSlug}
                  {...inputProps}
                />
              );
            })}
            <TextField
              id="outlined-name"
              className={classes.customTextField}
              fullWidth
              select
              margin="normal"
              variant="outlined"
              label="I am a:"
              value={dropDown}
              onChange={this.handleDropDown}
            >
              {ROLES.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.customButton}
              onClick={() => onFormSubmit(this.state)}
            >
              {BUTTON_TEXT}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(RegistrationForm);
