import React, { useEffect, useRef } from 'react';
import { useMap } from '../../../shared';
import { SearchFieldContainer } from './SearchField.container';

export const SearchFieldEnhanced = (props) => {
    const AutoCompleteService = useRef(null);
    const PlacesService = useRef(null);
    const { map, isLoaded } = useMap();

    useEffect(() => {
        if (isLoaded) {
            // @ts-ignore
            AutoCompleteService.current = new window.google.maps.places.AutocompleteService();
            // @ts-ignore
            PlacesService.current = new window.google.maps.places.PlacesService(
                map
            );
        }
    }, [isLoaded, map]);
    if (!isLoaded) return;
    return (
        <SearchFieldContainer
            {...props}
            AutoCompleteService={AutoCompleteService.current}
            PlacesService={PlacesService.current}
        />
    );
};
