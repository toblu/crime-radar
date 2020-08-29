import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, IconButton, Menu, MenuItem, Link } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useAuth } from '../auth/shared/hooks';
import { ProfileMenuComponent } from './ProfileMenu.types';
import useLogin from '../auth/shared/hooks/useLogin';
import useLogout from '../auth/shared/hooks/useLogout';

const ProfileMenu: ProfileMenuComponent = () => {
  const { loading: authLoading, auth } = useAuth();
  const [login] = useLogin();
  const [logout] = useLogout();
  const [open, setOpen] = React.useState<boolean>(false);
  const anchorEl = React.useRef(null);

  if (authLoading) return null;
  const isLoggedIn = Boolean(auth?.user);

  return isLoggedIn ? (
    <div>
      <IconButton
        ref={anchorEl}
        onClick={() => {
          setOpen(true);
        }}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <MenuItem onClick={() => setOpen(false)}>
          <Link
            component={RouterLink}
            to="/profile"
            color="inherit"
            underline="none"
          >
            Profil
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            // TODO: why is logout type not callable?
            // @ts-ignore
            logout();
            setOpen(false);
          }}
        >
          Logga ut
        </MenuItem>
      </Menu>
    </div>
  ) : (
    <Button color="inherit" onClick={login}>
      Logga in
    </Button>
  );
};

export default ProfileMenu;
