import mongoose from 'mongoose';
import { IEvent } from '@crime-alert/shared';
import EventModel from './event.model';
import { fetchEventContent } from './fetchEventContent';

const {
    MONGODB_URI = 'mongodb+srv://admin:4hbZXFhLDgyHgVvJ@cluster0.q5i7b.mongodb.net/crime-alert?retryWrites=true&w=majority',
    CONTENT_BASE_URL = 'https://polisen.se'
} = process.env;

mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGODB_URI);
mongoose.connection
    .once('open', () => {
        console.log('Connected to MongoDB instance.');
    })
    .on('error', (error) => {
        console.log('Error connecting to MongoDB:', error);
    });

const populateContent = async () => {
    const events = await EventModel.find({
        url: new RegExp('^/')
    })
        .lean<IEvent>()
        .exec();

    let eventsAdded = 0;
    let eventsUpdated = 0;

    for (const event of events) {
        const { id, url, ...rest } = event;

        const contentUrl = CONTENT_BASE_URL + url;

        try {
            let isExistingEvent = false;
            try {
                isExistingEvent = await EventModel.exists({
                    remoteId: id
                });
            } catch (e) {
                console.error(e);
            }

            const content = await fetchEventContent(contentUrl);

            if (!isExistingEvent) {
                await EventModel.create({
                    remoteId: id,
                    content,
                    url: contentUrl,
                    ...rest
                });
                eventsAdded++;
            } else {
                if (
                    event?.url !== contentUrl ||
                    (content && event?.content !== content)
                ) {
                    await EventModel.updateOne(
                        { remoteId: event.remoteId },
                        {
                            summary: event.summary,
                            name: event.name,
                            content: content ? content : event.content,
                            url: contentUrl
                        }
                    ).exec();

                    eventsUpdated++;
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    console.log(
        `DB synced!\n${eventsAdded} events added, ${eventsUpdated} events updated.`
    );
    process.exit(0);
};

populateContent();
