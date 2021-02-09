import express from 'express';
import mongoose from 'mongoose';
import {EventModel} from '@crime-alert/shared';
import { IEvent } from '@crime-alert/shared/dist/models/event';
import fetch from 'node-fetch';
import * as _ from 'lodash';

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
  console.log('Fetching events');

  const response = await fetch(API_URL, {
    headers: {
      'User-Agent': `crime-alert/${version} (Serverless; AWS)`
    }
  });
  const events = (await response.json()) as IEvent[];

  for (const event of events) {
    try {
      console.log('Mapping event', JSON.stringify(event, null, 2));
      let isExistingEvent = false;
      try {
        isExistingEvent = await EventModel.exists({
          remoteId: event.id
        });
        console.log('isExistingEvent:', isExistingEvent);
      } catch (e) {
        console.log('Failed existing event lookup');
        console.error(e);
      }

      if (!isExistingEvent) {
        const { id, ...rest } = event;
        console.log('Adding new event to DB');
        EventModel.create({ remoteId: id, ...rest });
        continue;
      }

      const storedEvent = await EventModel.findOne({ remoteId: event.id }).lean<
        IEvent
      >();

      if (
        storedEvent?.summary !== event.summary ||
        storedEvent?.name !== event.name
      ) {
        console.log('Updating existing event');
        await EventModel.updateOne(
          { _id: event.id },
          { summary: event.summary, name: event.name }
        );
      }
      continue;
    } catch (e) {
      console.error(e);
    }
  }

  res.json({
    result: 'DB updated'
  });
  return;
});

export default app;
