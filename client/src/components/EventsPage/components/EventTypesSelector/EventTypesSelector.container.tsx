import React, { useCallback, useState } from 'react';
import { constants } from '@crime-alert/shared';
import {
    EventTypesSelectorContainerComponent,
    SelectOptions
} from './EventTypesSelector.types';
import { IEventType } from '@crime-alert/shared/dist/constants';
import { EventTypesSelectorView } from './EventTypesSelector.view';
import { ALL } from './EventTypesSelector.constants';

const isEventType = (value: IEventType | typeof ALL): value is IEventType =>
    value !== ALL;

export const EventTypesSelectorContainer: EventTypesSelectorContainerComponent = ({
    className,
    size,
    initiallySelected = constants.eventTypes,
    onChange
}) => {
    const [selectedEventTypes, setSelectedEventTypes] = useState<SelectOptions>(
        initiallySelected
    );

    const [allSelected, setAllSelected] = useState(
        initiallySelected.length === constants.eventTypes.length
    );

    const toggleAllSelected = () => {
        if (allSelected) {
            setAllSelected(false);
            setSelectedEventTypes([]);
        } else {
            setAllSelected(true);
            setSelectedEventTypes(constants.eventTypes);
        }
    };

    const onSelectChange = useCallback(
        (e: React.ChangeEvent<{ name: string; value: SelectOptions }>) => {
            if ([...e.target.value].pop() === ALL) return;
            setAllSelected(
                e.target.value.length === constants.eventTypes.length
            );
            setSelectedEventTypes(e.target.value);
        },
        []
    );

    const handleClose = useCallback(() => {
        onChange(selectedEventTypes.filter(isEventType));
    }, [selectedEventTypes, onChange]);

    return (
        <EventTypesSelectorView
            className={className}
            size={size}
            selectedEventTypes={selectedEventTypes}
            allSelected={allSelected}
            onSelectAllClick={toggleAllSelected}
            onChange={onSelectChange}
            onClose={handleClose}
        />
    );
};
