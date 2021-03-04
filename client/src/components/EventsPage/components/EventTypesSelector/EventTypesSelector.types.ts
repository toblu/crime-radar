import { IEventType } from '@crime-alert/shared/dist/constants';
import { SelectProps } from '@material-ui/core';
import { ALL } from './EventTypesSelector.constants';

export type SelectOptions = Array<typeof ALL | IEventType>;

type EventTypesSelectorViewProps = {
    className?: string;
    size?: 'small' | 'medium';
    selectedEventTypes: Array<typeof ALL | IEventType>;
    allSelected: boolean;
    onChange: (
        event: React.ChangeEvent<{ name: string; value: SelectOptions }>
    ) => void;
    onSelectAllClick: () => void;
    onClose?: SelectProps['onClose'];
};
type EventTypesSelectorContainerProps = {
    className?: string;
    size?: 'small' | 'medium';
    initiallySelected?: IEventType[];
    onChange: (selected: IEventType[]) => void;
};

export type EventTypesSelectorViewComponent = React.FC<
    EventTypesSelectorViewProps
>;
export type EventTypesSelectorContainerComponent = React.FC<
    EventTypesSelectorContainerProps
>;
