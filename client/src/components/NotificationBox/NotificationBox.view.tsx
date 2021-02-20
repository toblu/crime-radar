import React from 'react';
import { NotificationBoxComponent, Props } from './NotificationBox.types';
import { makeStyles, Typography, IconButton } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-flex',
        width: '100%',
        minHeight: '56px',
        background: (props: Props) => theme.palette[props.level]?.main,
        color: (props: Props) =>
            theme.palette.getContrastText(theme.palette[props.level]?.main),
        marginBottom: '16px'
    },
    iconContainer: {
        color: 'inherit',
        margin: 'auto 8px'
    },
    messageContainer: {
        color: 'inherit',
        flex: 1,
        margin: 'auto 16px',
        padding: '4px 0'
    },
    closeButton: {
        color: 'inherit',
        margin: '0'
    }
}));

const messageIcons = {
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoIcon,
    success: CheckCircleIcon
};

export const NotificationBoxView: NotificationBoxComponent = (props) => {
    const { level, children, closeable = true } = props;
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        setOpen(true);
    }, [level, children]);

    const classes = useStyles(props);
    const MessageIcon = messageIcons[level];
    return open ? (
        <div className={classes.root}>
            <div className={classes.iconContainer}>
                <MessageIcon fontSize="large" />
            </div>
            <div className={classes.messageContainer}>
                <Typography color="inherit">{children}</Typography>
            </div>
            {closeable && (
                <div className={classes.closeButton}>
                    <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </div>
            )}
        </div>
    ) : null;
};
