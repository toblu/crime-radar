import { TextField } from '@material-ui/core';

type DateRangePickerBaseProps = {
    className?: string;
    valueStart?: string | Date;
    valueEnd?: string | Date;
    onChange: (value: { startDate: Date; endDate: Date }) => void;
    size?: React.ComponentProps<typeof TextField>['size'];
};
type UncontrolledDateRangePickerProps = DateRangePickerBaseProps & {
    open?: undefined;
    onOpen?: () => void;
    onClose?: () => void;
};

type ControlledDateRangePickerProps = DateRangePickerBaseProps & {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
};

type DateRangePickerContainerProps =
    | UncontrolledDateRangePickerProps
    | ControlledDateRangePickerProps;

type DateRangePickerViewProps = {
    className?: string;
    startDate: Date | null;
    endDate: Date | null;
    onStartDateChange: (date: Date) => void;
    onEndDateChange: (date: Date) => void;
    size?: React.ComponentProps<typeof TextField>['size'];
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export type DateRangePickerContainerComponent = React.FC<
    DateRangePickerContainerProps
>;
export type DateRangePickerViewComponent = React.FC<DateRangePickerViewProps>;
