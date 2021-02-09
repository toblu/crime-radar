import { EventModel } from '@crime-alert/shared';
import { IEvent } from '@crime-alert/shared/dist/models/event';

export async function getEvents(): Promise<IEvent[]> {
  const events = await EventModel.find().lean<IEvent>().exec();
  return events;
}
