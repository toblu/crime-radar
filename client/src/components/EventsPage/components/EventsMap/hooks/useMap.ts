import React, { useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

export const useMap = () => {
    const { isLoaded } = useJsApiLoader({
        language: 'se',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
    });

    const [map, setMap] = React.useState(null);

    const onLoad = useCallback((map) => {
        // @ts-ignore
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => setMap(null), []);

    return { isLoaded, map, loadMap: onLoad, unloadMap: onUnmount };
};
