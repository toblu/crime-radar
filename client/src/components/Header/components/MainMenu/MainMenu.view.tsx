import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export const MainMenuView: React.FC = () => {
    const anchorEl = React.useRef(null);
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <div>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                ref={anchorEl}
                onClick={() => {
                    setOpen(true);
                }}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl.current}
                open={open}
                onClose={() => setOpen(false)}
            >
                <MenuItem onClick={() => setOpen(false)}>
                    <Link
                        component={RouterLink}
                        to="/events"
                        color="inherit"
                        underline="none"
                    >
                        Händelser
                    </Link>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <Link
                        component={RouterLink}
                        to="/about"
                        color="inherit"
                        underline="none"
                    >
                        Om Crime Radar
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
};
