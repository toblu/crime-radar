type Coordinates = {
    latitude: number;
    longitude: number;
};

/**
 * Parses comma-separated string coordinates to a Coordinates object.
 * @param coordStr - comma-separated string coordinates ("lat,lng")
 * @returns coordinates as an object with parsed number coordinates
 */
export const parseCoordinates = (coordStr: string): Coordinates => {
    const [latitude, longitude] = coordStr.split(',').map(parseFloat);
    return {
        latitude,
        longitude
    };
};
