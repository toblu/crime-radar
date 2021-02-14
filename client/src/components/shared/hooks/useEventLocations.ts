import { useQuery } from '@apollo/client';
import { GET_LOCATIONS } from './../../../graphql/queries';

type Location = { name: string };
const EMPTY_ARRAY: string[] = [];

export const useEventLocations = () => {
  const { loading, data, error } = useQuery<{ locations: Location[] }>(
    GET_LOCATIONS
  );
  return {
    loading,
    locations: data?.locations?.map(({ name }) => name) ?? EMPTY_ARRAY,
    error
  };
};
