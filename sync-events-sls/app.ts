import express from 'express';
import mongoose from 'mongoose';
import { EventModel } from '@crime-alert/shared';
import { IEvent } from '@crime-alert/shared/dist/models/event';
import fetch from 'node-fetch';
import * as _ from 'lodash';
import { filter } from 'lodash';

const version = require('./package.json').version;

// Create a new Express application
const app = express();

const { MONGODB_URI = '', API_URL = '' } = process.env;

mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGODB_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB instance.'))
  .on('error', (error) => console.log('Error connecting to MongoDB:', error));

app.get('/', async function (req, res) {
  console.log('Initializing events sync');

  const response = await fetch(API_URL, {
    headers: {
      'User-Agent': `crime-alert/${version} (Serverless; AWS)`
    }
  });
  const events = (await response.json()) as IEvent[];

  let eventsAdded = 0;
  let eventsUpdated = 0;

  for (const event of events) {
    const { id, ...rest } = event;
    try {
      let isExistingEvent = false;
      try {
        isExistingEvent = await EventModel.exists({
          remoteId: id
        });
      } catch (e) {
        console.error(e);
      }

      if (!isExistingEvent) {
        EventModel.create({ remoteId: id, ...rest });
        eventsAdded++;
      } else {
        const storedEvent = await EventModel.findOne({
          remoteId: event.id
        }).lean<IEvent>();

        if (
          storedEvent?.summary !== event.summary ||
          storedEvent?.name !== event.name
        ) {
          await EventModel.updateOne(
            { _id: event.id },
            { summary: event.summary, name: event.name }
          );
          eventsUpdated++;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  res.json({
    result: `DB synced!\n${eventsAdded} events added, ${eventsUpdated} events updated.
    `
  });
  return;
});

export default app;
