import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  card: {
    minWidth: 275,
    maxWidth: '600px',
    width: '100%',
    margin: '1em'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    flex: 1,
    color: theme.palette.primary.main
  },
  textField: {
    '& label.Mui-focused': {
      color: theme.palette.secondary.light
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.light
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main
      }
    }
  }
});

const FIELDS = ['Name', 'USC Email', 'USCID', 'Password', 'Confirm Password'];

function RegistrationForm(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography className={classes.header} variant="h4">
            Get Started!
          </Typography>
          {FIELDS.map(text => (
            <TextField
              id="outlined-name"
              label={text}
              className={classes.textField}
              fullWidth
              margin="normal"
              variant="outlined"
              key={text}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

RegistrationForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(RegistrationForm);
