import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { button, textField } from '../../theme';
import ValidatedTextInput from '../../components/ValidatedTextInput';
import DropDown from '../../components/DropDown';
import MAJORS from './majors';

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
    text: 'Password',
    stateSlug: 'password_field',
  },
  {
    text: 'Confirm Password',
    stateSlug: 'confirm_field',
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

const BUTTON_TEXT = 'Submit';

class RegistrationForm extends React.Component {
  componentWillMount() {
    FIELDS.forEach(textContent => {
      this.setState(previousState => {
        return {
          ...previousState,
          [textContent.stateSlug]: '',
        };
      });
    });
    DROPDOWNS.forEach(dropDown => {
      this.setState(previousState => {
        return {
          ...previousState,
          [dropDown.name]: '',
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
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onFormSubmit } = this.props;
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
            })}
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
