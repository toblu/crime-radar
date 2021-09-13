import { Event, EventFilter } from './../types/event.types';
import { GET_EVENTS } from './../../../graphql/queries/events';
import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { throttle } from '../utils';

const EMPTY_ARRAY: Event[] = [];

const ONE_MINUTE = 60 * 1000;

export const useEvents = (params: EventFilter = {}) => {
    const { loading, data, error, refetch } = useQuery<{ events: Event[] }>(
        GET_EVENTS,
        {
            variables: params
        }
    );

    const throttledRefetch = useMemo(() => throttle(refetch, ONE_MINUTE), [
        refetch
    ]);

    useEffect(() => {
        const handleRefetchEvents = () => {
            if (!document.hidden) {
                throttledRefetch();
            }
        };
        document.addEventListener('visibilitychange', handleRefetchEvents);

        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleRefetchEvents
            );
        };
    }, [throttledRefetch]);

    return { loading, events: data?.events ?? EMPTY_ARRAY, error };
};
