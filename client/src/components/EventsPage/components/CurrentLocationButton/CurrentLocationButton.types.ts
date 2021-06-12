import { SyntheticEvent } from 'react';

type CurrentLocationButtonViewProps = {
    loading: boolean;
    locationUnavailable: boolean;
    onClick: (e: SyntheticEvent) => void;
};

export type CurrentLocationButtonViewComponent = React.FC<
    CurrentLocationButtonViewProps
>;
