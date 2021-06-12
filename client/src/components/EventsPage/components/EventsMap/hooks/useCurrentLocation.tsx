import { useCallback, useEffect, useState } from 'react';
import { Coordinates } from '../../../../shared/types/location.types';

export const useCurrentLocation = () => {
    const [position, setPosition] = useState<Coordinates | undefined>();
    const [loading, setLoading] = useState(false);
    const [locationUnavailable, setLocationUnavailable] = useState(false);
    const updateLocation = useCallback(() => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    setPosition({ latitude, longitude });
                    setLoading(false);
                    setLocationUnavailable(false);
                },
                () => {
                    setLoading(false);
                    setLocationUnavailable(true);
                },
                { timeout: 7500 }
            );
        }
    }, []);

    useEffect(() => {
        updateLocation();
    }, [updateLocation]);

    return {
        location: position,
        loading,
        updateLocation,
        locationUnavailable
    };
};
