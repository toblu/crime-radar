import { Event, EventFilter } from './../types/event.types';
import { GET_EVENTS } from './../../../graphql/queries/events';
import { useQuery } from '@apollo/client';

const EMPTY_ARRAY: Event[] = [];

export const useEvents = (params: EventFilter = {}) => {
  const { loading, data, error } = useQuery<{ events: Event[] }>(GET_EVENTS, {
    variables: params
  });
  return { loading, events: data?.events ?? EMPTY_ARRAY, error };
};
