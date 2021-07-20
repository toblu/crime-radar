import { IEventType } from '../constants';

export type IEvent = {
    id: string;
    remoteId: string;
    datetime: Date;
    name: string;
    summary: string;
    content: string;
    url: string;
    type: IEventType;
    location: {
        name: string;
        gps: string;
    };
};
