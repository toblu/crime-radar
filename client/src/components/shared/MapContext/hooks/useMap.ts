import { useContext } from 'react';
import { MapContextValues } from '../MapContext.types';
import { MapContext } from '../MapContext';

export const useMap = () => {
    const mapContext = useContext<MapContextValues>(MapContext);
    if (!mapContext) {
        throw new Error(
            'Missing required MapContext. Make sure to wrap your component in a MapContext.Provider'
        );
    }
    return mapContext;
};
