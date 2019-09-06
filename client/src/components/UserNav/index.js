/**
 *
 * UserNav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class UserNav extends React.Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawer = open => () => {
    this.setState({ drawerOpen: open });
  };

  render() {
    const { classes } = this.props;
    const isMobile = mobile();
    const { drawerOpen } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="secondary"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}
              data-testid="menu-button"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="secondary" className={classes.grow}>
              {isMobile ? 'SHPE Tutoring' : 'SHPE Tutoring and Academics'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={drawerOpen} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
            data-testid="drawer"
          >
            <div className={classes.list}>
              <List>
                <ListItem button key="messages">
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Messages" />
                </ListItem>
                <Divider />
                <ListItem button key="Log In">
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log In" />
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

UserNav.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(UserNav);
