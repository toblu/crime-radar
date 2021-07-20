import { IEvent } from '@crime-alert/shared';
import mongoose from 'mongoose';

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
