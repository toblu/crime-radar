import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from '../../../shared/utils';
import {
    SearchFieldContainerComponent,
    Place,
    Prediction
} from './SearchField.types';
import { SearchFieldView } from './SearchField.view';

const fields = ['name', 'geometry.location'];
const componentRestrictions = { country: 'se' };

const isPrediction = (input: string | Prediction): input is Prediction =>
    !!input && typeof input !== 'string';

export const SearchFieldContainer: SearchFieldContainerComponent = ({
    onChange,
    AutoCompleteService,
    PlacesService
}) => {
    const [place, setPlace] = useState<Place>();
    const [predictions, setPredictions] = useState<Prediction[]>([]);

    const debouncedGetQueryPredictions = useMemo(() => {
        return debounce(
            AutoCompleteService?.getQueryPredictions.bind(AutoCompleteService),
            250
        );
    }, [AutoCompleteService]);

    const handleInputChange = useCallback(
        (input) => {
            if (input?.length) {
                debouncedGetQueryPredictions(
                    {
                        input,
                        componentRestrictions
                    },
                    (predictions) => {
                        predictions = predictions ?? [];
                        setPredictions(
                            predictions.map(
                                ({
                                    place_id: placeId,
                                    structured_formatting: { main_text: name }
                                }) => ({
                                    placeId,
                                    name
                                })
                            )
                        );
                    }
                );
            }
        },
        [setPredictions, debouncedGetQueryPredictions]
    );

    const handlePlaceSelect = useCallback(
        (value: Prediction | string) => {
            const prediction = isPrediction(value) ? value : predictions[0];
            if (prediction) {
                const { placeId } = prediction;
                PlacesService.getDetails(
                    {
                        placeId,
                        fields
                    },
                    setPlace
                );
            }
        },
        [setPlace, predictions, PlacesService]
    );

    useEffect(() => {
        if (place) {
            const {
                geometry: { location }
            } = place;
            onChange({ latitude: location.lat(), longitude: location.lng() });
        }
    }, [place]);

    return (
        <SearchFieldView
            options={predictions}
            onChange={handlePlaceSelect}
            onInputChange={handleInputChange}
        />
    );
};
