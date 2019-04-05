import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import mobile from 'is-mobile';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import LoginIcon from '@material-ui/icons/ExitToApp'

/**
 * Styling for different components
 */
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
  },
};

const drawerOptions = [
  {
    text: 'Messages',
    icon: <MailIcon/>,
  },
  {
    text: 'Settings',
    icon: <SettingsIcon/>,
  }
]

class ButtonAppBar extends React.Component {
  state = {
    drawer: false
  }

  toggleDrawer = (open) => {
    this.setState({drawer: open});
  };

  render () {
    const { classes } = this.props;
    const isMobile = mobile();

    /**
     * Render different title if on mobile 
     * for more real estate
     */
    let header;
    if (isMobile) {
      header = 'Study Nights';
    } else {
      header = 'SHPE Study Nights Tutors';
    }

    return (
      <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton 
              className={classes.menuButton}
              color="secondary"
              aria-label="Menu"
              onClick={() => {this.toggleDrawer(true)}}>
                <MenuIcon />
              </IconButton>
              <Drawer
              open={this.state.drawer}
              onClose={() => {this.toggleDrawer(false)}}>
                  <div
                  tabIndex={0}
                  role="button"
                  onClick={() => {this.toggleDrawer(false)}}
                  onKeyDown={() => {this.toggleDrawer(false)}}>
                  </div>
                  <div className={classes.list}>
                      <List>
                          {drawerOptions.map( (opts) => (
                            <ListItem button key={opts.text}>
                            <ListItemIcon>{opts.icon}</ListItemIcon>
                            <ListItemText primary={opts.text} />
                            </ListItem>
                          ))}
                      </List>
                      {isMobile && (
                        <React.Fragment>
                        <Divider/>
                        <List>
                          <ListItem button key={'Login'}>
                          <ListItemIcon><LoginIcon/></ListItemIcon>
                          <ListItemText primary={'Login'} />
                          </ListItem>
                        </List>
                        </React.Fragment>
                      )}
                  </div>
              </Drawer>
              <Typography
              variant="h6"
              color="secondary"
              className={classes.grow}>
              {header}
              </Typography>
              {isMobile &&
              <Button color="secondary">Login</Button>
              }
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);