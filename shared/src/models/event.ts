import mongoose from 'mongoose';
import { IEventType } from '../constants';

const Schema = mongoose.Schema;

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

export type EventDocument = mongoose.Document & IEvent;

const EventSchema = new Schema<EventDocument>({
    id: String,
    remoteId: String,
    datetime: Date,
    name: String,
    summary: String,
    content: String,
    url: String,
    type: String,
    location: {
        name: String,
        gps: String
    }
});

export default mongoose.model<EventDocument>('event', EventSchema);
