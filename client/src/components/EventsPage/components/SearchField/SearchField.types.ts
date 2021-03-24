import React from 'react';
import { Autocomplete, GoogleMap } from '@react-google-maps/api';
import { Coordinates } from '../../../shared/types/location.types';

export type Place = {
    name: string;
    geometry: {
        location: {
            lat: () => number;
            lng: () => number;
        };
    };
};

export type Prediction = {
    name: string;
    placeId: string;
};

export type SearchFieldViewProps = {
    options: Prediction[];
    onChange: (value: Prediction | string) => void;
    onInputChange: (value: string) => void;
};
type SearchFieldContainerProps = {
    onChange: (coord: Coordinates) => void;
    // TODO: add correct typing
    AutoCompleteService: any;
    PlacesService: any;
};
export type SearchFieldEnhancedProps = {
    onChange: (coord: Coordinates) => void;
};

export type SearchFieldViewComponent = React.FC<SearchFieldViewProps>;
export type SearchFieldContainerComponent = React.FC<SearchFieldContainerProps>;
