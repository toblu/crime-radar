import { getLocations } from '../../services/events/events';
import LocationsType from '../types/locations_type';

export const locationsQuery = {
    type: LocationsType,
    async resolve() {
        const locations = await getLocations();
        return locations.map((location) => ({ name: location }));
    }
};
