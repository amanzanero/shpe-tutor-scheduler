/**
 *
 * UserNav
 *
 */

import React, { Fragment, useState } from 'react';
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
import SettingsIcon from '@material-ui/icons/Settings';
import BookIcon from '@material-ui/icons/Collections';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  text: {
    flexGrow: 1,
    fontSize: 26,
    fontFamily: 'Roboto Slab',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
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

function UserNav(props) {
  const {
    classes,
    onToggleModal,
    logOut,
    onToggleAddCourses,
    children,
    navigateHome,
  } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = mobile();
  const text = isMobile ? 'Tutors' : 'Tutoring and Academics';
  const toggleDrawerOpen = () => setDrawerOpen(prev => !prev);

  return (
    <Fragment>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={`${classes.menuButton} ${classes.white}`}
              aria-label="Menu"
              onClick={toggleDrawerOpen}
              data-testid="menu-button"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={`${classes.text} ${classes.white}`}
              onClick={navigateHome}
            >
              <span className={classes.gold}>SHPE </span>
              {text}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={drawerOpen} onClose={toggleDrawerOpen}>
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDrawerOpen}
            onKeyDown={toggleDrawerOpen}
            data-testid="drawer"
          >
            <div className={classes.list}>
              <List>
                <ListItem
                  button
                  key="messages"
                  onClick={() => console.log('hi')}
                >
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Messages" />
                </ListItem>
                <Divider />
                <ListItem button key="Settings" onClick={onToggleModal}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button key="Courses" onClick={onToggleAddCourses}>
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText primary="Courses" />
                </ListItem>
                <ListItem button key="Log Out" onClick={logOut}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </div>
      {children}
    </Fragment>
  );
}

export default withStyles(styles)(UserNav);
