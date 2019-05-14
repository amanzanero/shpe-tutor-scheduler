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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function UserNav(props) {
  const { classes } = props;
  const isMobile = mobile();
  const [state, setState] = React.useState({
    drawerOpen: false,
  });

  const toggleDrawer = (side, open) => () => {
    setState({ ...state, [side]: open });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="secondary"
            aria-label="Menu"
            onClick={toggleDrawer('drawerOpen', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="secondary" className={classes.grow}>
            {isMobile ? 'SHPE Tutoring' : 'SHPE Tutoring and Academics'}
          </Typography>
          {!isMobile && <Button color="secondary">Login</Button>}
        </Toolbar>
      </AppBar>
      <Drawer
        open={state.drawerOpen}
        onClose={toggleDrawer('drawerOpen', false)}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer('drawerOpen', false)}
          onKeyDown={toggleDrawer('drawerOpen', false)}
        >
          <div className={classes.list}>
            <List>
              <ListItem button key="messages">
                <ListItemIcon>
                  <MailIcon />
                  <ListItemText primary="Messages" />
                </ListItemIcon>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button key="Log In">
                <ListItemIcon>
                  <ExitToAppIcon />
                  <ListItemText primary="Log In" />
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

UserNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserNav);
