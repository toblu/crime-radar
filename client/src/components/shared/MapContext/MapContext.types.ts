import { GoogleMap } from '@react-google-maps/api';

export type MapContextValues = {
    isLoaded: boolean;
    map: GoogleMap;
};
