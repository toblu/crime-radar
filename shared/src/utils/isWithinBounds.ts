import { IEvent } from '../models/event';
import { isBetween } from './isBetween';
import { parseCoordinates } from './parseCoordinates';

type Bounds = {
    latitude: {
        min: number;
        max: number;
    };
    longitude: {
        min: number;
        max: number;
    };
};

export const isWithinBounds = (
    bounds: Bounds,
    event: { location: IEvent['location'] }
): boolean => {
    const coordinates = parseCoordinates(event.location.gps);
    const compareCoordMap = Object.entries(bounds).reduce((acc, coordEntry) => {
        const [key, minMax] = coordEntry;
        return {
            ...acc,
            [key]: isBetween(minMax.min, minMax.max)
        };
    }, {});
    return Object.entries(coordinates).every(([coordKey, coordValue]) =>
        compareCoordMap[coordKey](coordValue)
    );
};
