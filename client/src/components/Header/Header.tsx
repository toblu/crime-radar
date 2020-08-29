import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Theme
} from '@material-ui/core';
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
          <Typography className={classes.title} variant="h6">
            Crime Alert
          </Typography>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
