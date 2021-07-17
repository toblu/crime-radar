import React, { useState } from 'react';
import { Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { EventDetailsViewComponent } from './EventDetails.types';

const useStyles = makeStyles(() => ({
    titleRow: {
        position: 'sticky',
        display: 'inline-flex',
        alignItems: 'center',
        top: 0,
        zIndex: 1,
        backgroundColor: '#fff'
    },
    contentBody: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 40
    },
    contentRow: {
        marginTop: 8,
        marginBottom: 8
    },
    sourceLink: {
        overflowWrap: 'break-word'
    },
    expandButtonRow: {
        display: 'inline-flex',
        alignItems: 'center',
        height: '24px',
        width: '100%',
        marginBottom: 8
    },
    divider: {
        flex: 1
    }
}));

const ContentRow = ({ title, text, expandable = false }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={classes.contentRow}>
            <Typography>
                <b>{title}</b>
            </Typography>
            {!expandable ? (
                <Typography dangerouslySetInnerHTML={{ __html: text }} />
            ) : (
                <div>
                    {expanded && (
                        <Typography
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                    )}
                    <div className={classes.expandButtonRow}>
                        <Divider className={classes.divider} />
                        <IconButton onClick={() => setExpanded(!expanded)}>
                            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                        <Divider className={classes.divider} />
                    </div>
                </div>
            )}
        </div>
    );
};

export const EventDetailsView: EventDetailsViewComponent = ({
    loading,
    event,
    onClose
}) => {
    const classes = useStyles();

    if (loading || !event) return null;

    const { type, location, name, summary, content, url } = event;

    const eventTime = name.split(',')[0];

    return (
        !loading && (
            <>
                <div className={classes.titleRow}>
                    <IconButton aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6">Detaljer</Typography>
                </div>
                <div className={classes.contentBody}>
                    <ContentRow title="Typ av händelse:" text={type} />
                    <ContentRow title="Tid för händelsen" text={eventTime} />
                    <ContentRow title="Plats:" text={location.name} />
                    <ContentRow
                        title="Beskrivning av händelse:"
                        text={summary}
                    />

                    {content && (
                        <ContentRow title="" text={content} expandable />
                    )}

                    <Typography
                        className={classes.sourceLink}
                        variant="subtitle2"
                    >
                        Källa:&nbsp;
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {url}
                        </a>
                    </Typography>
                </div>
            </>
        )
    );
};
