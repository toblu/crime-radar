import React from 'react';
import {
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    makeStyles
} from '@material-ui/core';
import { constants } from '@crime-alert/shared';
import { ALL } from './EventTypesSelector.constants';
import { EventTypesSelectorViewComponent } from './EventTypesSelector.types';

const useStyles = (size: 'small' | 'medium') =>
    makeStyles({
        root: {
            fontSize: size === 'small' ? 14 : 16
        },
        menuItemSelected: {
            backgroundColor: 'inherit !important'
        },
        menuItemDense: {
            fontSize: 14,
            height: 44
        },
        selectMenu: {
            whiteSpace: 'inherit'
        }
    })();

export const EventTypesSelectorView: EventTypesSelectorViewComponent = ({
    className,
    size = 'small',
    selectedEventTypes,
    allSelected,
    onChange,
    onSelectAllClick,
    onClose
}) => {
    const classes = useStyles(size);
    return (
        <FormControl className={className} size={size}>
            <Select
                classes={{ root: classes.root, selectMenu: classes.selectMenu }}
                labelId="type-of-event-label"
                multiple
                value={selectedEventTypes}
                autoWidth
                onChange={onChange}
                renderValue={(selected: typeof selectedEventTypes) => {
                    if (allSelected) {
                        return 'Alla typer av händelser';
                    } else if (selected.length === 1) {
                        return '1 typ av händelse vald';
                    } else if (selected.length > 1) {
                        return `${selected.length} typer av händelser valda`;
                    } else {
                        return 'Inga typer av händelser valda';
                    }
                }}
                onClose={onClose}
            >
                <MenuItem
                    key="all-events-item"
                    classes={{
                        dense: classes.menuItemDense,
                        selected: classes.menuItemSelected
                    }}
                    value={ALL}
                    onClick={onSelectAllClick}
                    dense={size === 'small'}
                >
                    <Checkbox checked={allSelected} />
                    Välj alla
                </MenuItem>
                {constants.eventTypes.map((eventType) => (
                    <MenuItem
                        key={eventType}
                        classes={{
                            dense: classes.menuItemDense,
                            selected: classes.menuItemSelected
                        }}
                        value={eventType}
                        dense={size === 'small'}
                    >
                        <Checkbox
                            checked={selectedEventTypes.includes(eventType)}
                        />
                        {eventType}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
