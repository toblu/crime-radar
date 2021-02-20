import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Button, Link } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ProfileMenuViewComponent } from './ProfileMenu.types';

export const ProfileMenuView: ProfileMenuViewComponent = ({
    isLoggedIn,
    onLogin,
    onLogout
}) => {
    const anchorEl = React.useRef(null);
    const [open, setOpen] = React.useState<boolean>(false);

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
                        onLogout();
                        setOpen(false);
                    }}
                >
                    Logga ut
                </MenuItem>
            </Menu>
        </div>
    ) : (
        <Button color="inherit" onClick={onLogin}>
            Logga in
        </Button>
    );
};
