import React, { useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

export const useLoadMap = () => {
    const { isLoaded } = useJsApiLoader({
        language: 'se',
        // @ts-ignore
        libraries,
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
