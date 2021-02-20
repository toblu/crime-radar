import { constants } from '@crime-alert/shared';

export const eventTypeKeyValueMap = constants.eventTypes.reduce(
    (acc, type, i) => ({ ...acc, [`key_${i}`]: type }),
    {}
);
