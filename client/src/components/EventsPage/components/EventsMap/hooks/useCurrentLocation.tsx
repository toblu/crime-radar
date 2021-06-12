import { useCallback, useState } from 'react';
import { Coordinates } from '../../../../shared/types/location.types';

export const useCurrentLocation = () => {
    const [position, setPosition] = useState<Coordinates | undefined>();
    const [loading, setLoading] = useState(false);
    const [locationUnavailable, setLocationUnavailable] = useState(false);
    const getLocation = useCallback(() => {
        return new Promise<Coordinates>((resolve, reject) => {
            if (navigator.geolocation) {
                setLoading(true);
                navigator.geolocation.getCurrentPosition(
                    ({ coords: { latitude, longitude } }) => {
                        setPosition({ latitude, longitude });
                        setLoading(false);
                        setLocationUnavailable(false);
                        resolve({ latitude, longitude });
                    },
                    () => {
                        setLoading(false);
                        setLocationUnavailable(true);
                        reject();
                    },
                    { timeout: 10000, maximumAge: 300000 }
                );
            }
        });
    }, []);

    return {
        location: position,
        loading,
        getLocation,
        locationUnavailable
    };
};
