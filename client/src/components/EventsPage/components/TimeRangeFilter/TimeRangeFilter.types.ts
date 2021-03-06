import { TimePeriod } from '../EventFilter/EventFilter.types';

type TimeRangeFilterViewProps = {
    className?: string;
    size?: 'small' | 'medium';
    timePeriod: TimePeriod;
    customTimePeriod?: TimePeriod;
    onTimePeriodChange: (newTimePeriod: TimePeriod) => void;
    onCustomTimePeriodChange: (newTimePeriod: TimePeriod) => void;
};
type TimeRangeFilterContainerProps = {
    className?: string;
    size?: 'small' | 'medium';
    initialTimePeriod?: TimePeriod;
    onTimePeriodChange: (newTimePeriod: TimePeriod) => void;
};

export type TimeRangeFilterViewComponent = React.FC<TimeRangeFilterViewProps>;
export type TimeRangeFilterContainerComponent = React.FC<
    TimeRangeFilterContainerProps
>;
