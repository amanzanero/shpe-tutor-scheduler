import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import mobile from 'is-mobile';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  text: {
    flexGrow: 1,
    fontSize: 26,
    fontFamily: 'Roboto Slab',
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
  margin: {
    margin: '.5em',
  },
  gold: {
    color: theme.palette.secondary.light,
  },
  white: {
    color: 'white',
  },
});

function LandingNav(props) {
  const isMobile = mobile.isMobile();
  const { classes } = props;
  const text = isMobile ? 'Tutors' : 'Tutoring and Academics';
  const buttonText = 'Login';
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={`${classes.text} ${classes.white}`}
          >
            <span className={classes.gold}>SHPE </span>
            {text}
          </Typography>
          <Button
            size="medium"
            variant="contained"
            className={`${classes.button} ${classes.margin} ${classes.white}`}
          >
            {buttonText}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

LandingNav.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(LandingNav);
