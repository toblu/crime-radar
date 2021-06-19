import React, { useCallback, useEffect, useState } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { constants } from '@crime-alert/shared';
import { IEventType } from '@crime-alert/shared/dist/constants';
import { useEvents } from '../shared/hooks';
import { EventFilter, EventsMap } from './components';
import { TimePeriod } from './components/EventFilter/EventFilter.types';
import { EventsDrawer } from './components/EventsDrawer';
import { LAST_7_DAYS } from './components/TimeRangeFilter/TimeRangeFilter.constants';
import { EventsPageView } from './EventsPage.view';

export const EventsPageContainer = () => {
    const { path } = useRouteMatch();
    const isEventsDrawerRoute = useRouteMatch([`${path}/:ids`]);
    const history = useHistory();

    const [timePeriod, setTimePeriod] = useState<TimePeriod>(LAST_7_DAYS);
    const [eventTypes, setEventTypes] = useState<IEventType[]>(
        constants.eventTypes
    );
    const { events, loading } = useEvents({
        from: timePeriod.from,
        to: timePeriod.to,
        type: eventTypes.length ? (eventTypes as IEventType[]) : undefined
    });

    const [showSelectedArea, setShowSelectedArea] = useState(false);

    const handleEventsClick = useCallback(
        (events) => {
            history.push(
                `${path}/${events.map(({ remoteId }) => remoteId).join(',')}`
            );
        },
        [history, path]
    );

    const handleFilterChange = useCallback<
        (timePeriod: TimePeriod, eventTypes: IEventType[]) => void
    >((newTimePeriod, newEventTypes) => {
        setTimePeriod(newTimePeriod);
        setEventTypes(newEventTypes);
    }, []);

    useEffect(() => {
        setShowSelectedArea(false);
    }, [events]);

    useEffect(() => {
        if (!showSelectedArea) {
            history.push('/events');
        }
    }, [history, showSelectedArea]);

    useEffect(() => {
        if (!isEventsDrawerRoute) {
            setShowSelectedArea(false);
        }
    }, [isEventsDrawerRoute]);

    return (
        <EventsPageView>
            <EventFilter
                timePeriod={timePeriod}
                eventTypes={eventTypes}
                onChange={handleFilterChange}
            />
            <EventsMap
                eventsLoading={loading}
                events={events}
                onEventsClick={handleEventsClick}
                showSelectedArea={showSelectedArea}
                setShowSelectedArea={setShowSelectedArea}
            />
            <Route path={`${path}/:ids/:details?/:id?`}>
                <EventsDrawer allEvents={events} />
            </Route>
        </EventsPageView>
    );
};
