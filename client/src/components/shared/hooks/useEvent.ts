import { DetailedEvent } from './../types/event.types';
import { GET_EVENT } from './../../../graphql/queries';
import { useQuery } from '@apollo/client';

export const useEvent = (id: string) => {
    const { loading, data, error } = useQuery<{ event: DetailedEvent }>(
        GET_EVENT,
        {
            variables: { id }
        }
    );
    return { loading, event: data?.event, error };
};
