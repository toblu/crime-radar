import { useEffect, useState } from 'react';
import { Coordinates } from '../../shared/types/location.types';

export const useCurrentLocation = () => {
    const [position, setPosition] = useState<Coordinates | undefined>();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    setPosition({ latitude, longitude });
                }
            );
        }
    }, [setPosition]);

    return position;
};
