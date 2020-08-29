import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Theme, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { HeaderComponent } from './Header.types';
import { useStyles } from '../shared/hooks/useStyles';
import ProfileMenu from '../ProfileMenu';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  appBar: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});

const Header: HeaderComponent = () => {
  const classes = useStyles(styles);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Link
            component={RouterLink}
            className={classes.title}
            variant="h6"
            color="inherit"
            underline="none"
            to="/"
          >
            Crime Alert
          </Link>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
