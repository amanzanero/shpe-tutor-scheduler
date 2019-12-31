import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#990000',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#FFCC00',
      // dark: will be calculated from palette.secondary.main,
    },
    // error: will use the default color
  },
});

export const textField = {
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
};

export const button = {
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
  marginTop: '.5em',
  height: '2.5em',
  color: 'white',
};

export const useButtonStyles = makeStyles(thm => ({
  root: {
    backgroundColor: thm.palette.primary.light,
    '&:hover': {
      background: thm.palette.secondary.main,
    },
    '&:focus': {
      background: thm.palette.secondary.main,
    },
    fontSize: 18,
    textTransform: 'none',
    paddingTop: '.2em',
    paddingBottom: '.2em',
    marginTop: '.5em',
    height: '2.5em',
    color: 'white',
  },
}));

export default theme;
