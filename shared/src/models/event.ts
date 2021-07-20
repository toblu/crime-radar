import mongoose from 'mongoose';
import { IEvent } from '../interfaces';

const Schema = mongoose.Schema;

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
