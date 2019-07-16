import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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
  button: {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      background: theme.palette.secondary.main,
    },
    '&:focus': {
      background: theme.palette.secondary.main,
    },
    fontSize: 18,
    textTransform: 'none',
    paddingTop: '.2em',
    paddingBottom: '.2em',
  },
  textField: {
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
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography className={classes.header} variant="h4">
              Get Started!
            </Typography>
            {FIELDS.map(textContent => {
              const { [textContent.stateSlug]: val } = this.state;
              return (
                <TextField
                  id="outlined-name"
                  label={textContent.text}
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={val}
                  onChange={this.handleChange}
                  name={textContent.stateSlug}
                  key={textContent.stateSlug}
                />
              );
            })}
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
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
};

export default withStyles(styles)(RegistrationForm);
