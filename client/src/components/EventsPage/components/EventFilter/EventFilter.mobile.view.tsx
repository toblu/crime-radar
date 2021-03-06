import React, { useState } from 'react';
import {
    Card,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Toolbar
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FilterListIcon from '@material-ui/icons/FilterList';
import { subDays } from 'date-fns';
import { constants } from '@crime-alert/shared';
import { EventFilterViewComponent } from './EventFilter.types';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 48,
        position: 'relative',
        width: '100%'
    },
    toolbarRoot: {
        position: 'absolute',
        width: '100%',
        padding: 0,
        zIndex: 1,
        bottom: 0,
        height: (expanded) => (expanded ? 360 : 48),
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen,
            delay: 0
        })
    },
    card: {
        height: '100%',
        width: '100%',
        display: 'inline-flex',
        justifyContent: 'space-evenly'
    },
    cardColumn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8
    },
    formInputGroup: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    formLabel: {
        flexWrap: 'nowrap'
    },
    formInputIcon: {
        height: '100%',
        justifySelf: 'flex-start',
        marginRight: 8
    },
    inputSelect: {
        flexBasis: 275
    },
    formInputWrapper: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-evenly'
    }
}));

export const EventFilterMobileView: EventFilterViewComponent = () => {
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles(expanded);
    const now = new Date();

    return (
        <div className={classes.root}>
            <Toolbar
                classes={{ root: classes.toolbarRoot }}
                variant="dense"
                onClick={() => setExpanded(!expanded)}
            >
                <Card classes={{ root: classes.card }}>
                    <div className={classes.cardColumn}>
                        <DateRangeIcon
                            classes={{ root: classes.formInputIcon }}
                        />
                        <FormControl
                            classes={{ root: classes.formInputGroup }}
                            size="small"
                        >
                            <RadioGroup
                                className={classes.formInputWrapper}
                                row
                            >
                                <FormControlLabel
                                    classes={{ label: classes.formLabel }}
                                    labelPlacement="start"
                                    value={subDays(now, 7)}
                                    label="Senaste 7 dagar"
                                    control={<Radio size="small" />}
                                />
                                <FormControlLabel
                                    classes={{ label: classes.formLabel }}
                                    labelPlacement="start"
                                    value={subDays(now, 30)}
                                    label="Senaste 30 dagar"
                                    control={<Radio size="small" />}
                                />
                                <FormControlLabel
                                    classes={{ label: classes.formLabel }}
                                    labelPlacement="start"
                                    value=""
                                    label="Egen"
                                    control={<TextField size="small" />}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div className={classes.cardColumn}>
                        <FilterListIcon
                            classes={{ root: classes.formInputIcon }}
                        />
                        <div className={classes.formInputWrapper}>
                            <FormControl
                                className={classes.inputSelect}
                                size="small"
                            >
                                <InputLabel
                                    classes={{ root: classes.formLabel }}
                                    id="type-of-event-label"
                                >
                                    Typ av händelse
                                </InputLabel>
                                <Select
                                    labelId="type-of-event-label"
                                    multiple
                                    value={[]}
                                    autoWidth
                                >
                                    {constants.eventTypes.map((eventType) => (
                                        <MenuItem
                                            key={eventType}
                                            value={eventType}
                                        >
                                            {eventType}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </Card>
            </Toolbar>
        </div>
    );
};
