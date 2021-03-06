import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { button, textField } from '../../theme';
import ValidatedTextInput from '../../components/ValidatedTextInput';
import DropDown from '../../components/DropDown';
import MAJORS from '../../config/majors';

const { PASSWORD, CONFIRM_PASSWORD } = {
  PASSWORD: 'password_field',
  CONFIRM_PASSWORD: 'confirm_field',
};

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
    regex: /.*\S.*/,
    error_text: 'Enter a name',
  },
  {
    text: 'USC Email',
    stateSlug: 'email_field',
    regex: /^[a-zA-Z0-9._%+-]+@usc\.edu$/,
    error_text: 'Enter an email ending in @usc.edu',
  },
  {
    text: 'Password',
    stateSlug: PASSWORD,
    regex: /^[A-Za-z1-9.*%!@#&]{5,18}$/,
    error_text:
      'Enter 5-18 characters. Only special characters allowed: ., *, %, !, @, #, &',
  },
  {
    text: 'Confirm Password',
    stateSlug: CONFIRM_PASSWORD,
    regex: /^[A-Za-z1-9.*%!@#&]{5,18}$/,
    error_text: 'Password not the same',
  },
  {
    text: 'Grad Year',
    stateSlug: 'grad_field',
    regex: /^\d{4}$/,
    error_text: 'Enter a correct year',
  },
];

const ROLES = ['student', 'tutor', 'both'];

const DROPDOWNS = [
  {
    name: 'major',
    label: 'Major',
    options: MAJORS,
    error_text: 'Choose a major',
  },
  {
    name: 'role',
    label: 'I am a:',
    options: ROLES,
    error_text: 'Choose a role. You can always change later.',
  },
];

const BUTTON_TEXT = 'Submit';

function RegistrationForm(props) {
  const fieldState = FIELDS.reduce(
    (prev, curr) => ({
      ...prev,
      [`${curr.stateSlug}_text`]: '',
      [`${curr.stateSlug}_valid`]: true,
      [`${curr.stateSlug}_regex`]: curr.regex,
    }),
    {},
  );
  const dropDownState = DROPDOWNS.reduce(
    (prev, curr) => ({
      ...prev,
      [`${curr.name}_text`]: '',
      [`${curr.name}_valid`]: true,
    }),
    {},
  );

  const initialState = { ...fieldState, ...dropDownState, buttonValid: false };

  const [fields, setFields] = useState(initialState);

  const handleChange = event => {
    const { name, value } = event.target;
    setFields(prevState => ({
      ...prevState,
      [`${name}_text`]: value,
    }));
  };

  const validateButton = state => {
    var fieldsFull = FIELDS.reduce((acc, curr) => {
      return (
        acc &&
        state[`${curr.stateSlug}_valid`] &&
        state[`${curr.stateSlug}_text`] !== ''
      );
    }, true);
    var dropDownsFull = DROPDOWNS.reduce((acc, curr) => {
      return (
        acc && state[`${curr.name}_valid`] && state[`${curr.name}_text`] !== ''
      );
    }, true);

    return fieldsFull && dropDownsFull;
  };

  const onBlurText = e => {
    const name = e.target.name;
    const value = e.target.value;
    const reg = fields[`${name}_regex`];
    const match =
      name === CONFIRM_PASSWORD
        ? value === fields[`${PASSWORD}_text`]
        : reg.test(value);
    setFields(prevState => ({
      ...prevState,
      [`${name}_valid`]: match,
    }));
    setFields(prevState => ({
      ...prevState,
      buttonValid: validateButton(prevState),
    }));
  };

  const onBlurDrop = e => {
    const name = e.target.name;
    setFields(prevState => ({
      ...prevState,
      [`${name}_valid`]: e.target.value !== '',
    }));
    setFields(prevState => ({
      ...prevState,
      buttonValid: validateButton(prevState),
    }));
  };

  const handleDropDown = event => {
    setFields({ [`${event.target.name}_text`]: event.target.value });
  };

  const { classes, onFormSubmit } = props;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography className={classes.header} variant="h4">
            Get Started!
          </Typography>
          {FIELDS.map(textContent => {
            const text = fields[`${textContent.stateSlug}_text`];
            const valid = fields[`${textContent.stateSlug}_valid`];
            const inputProps = {
              textContent,
              val: text,
              handleChange: handleChange,
              onBlur: onBlurText,
              valid,
              type:
                textContent.stateSlug === PASSWORD ||
                textContent.stateSlug === CONFIRM_PASSWORD
                  ? 'password'
                  : null,
              error_text: textContent.error_text,
            };
            return (
              <ValidatedTextInput key={textContent.stateSlug} {...inputProps} />
            );
          })}
          {DROPDOWNS.map(item => {
            const text = fields[`${item.name}_text`];
            const valid = fields[`${item.name}_valid`];
            const dropDownProps = {
              name: item.name,
              options: item.options,
              handleDropDown: handleDropDown,
              label: item.label,
              dropDown: text,
              onBlur: onBlurDrop,
              valid,
            };
            return <DropDown key={item.name} {...dropDownProps} />;
          })}
          <Button
            variant="contained"
            size="large"
            color="primary"
            disabled={!fields.buttonValid}
            className={classes.customButton}
            onClick={() => onFormSubmit(fields)}
          >
            {BUTTON_TEXT}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

RegistrationForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(RegistrationForm);
