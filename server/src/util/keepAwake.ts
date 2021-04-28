import fetch from 'node-fetch';

const url = process.env.DYNO_URL;
const interval = process.env.DYNO_REQUEST_INTERVAL;

/**
 * Sends a network request to the Heroku dyno url at a set interval to prevent it from sleeping
 */
export const keepAwake = (): void => {
    const milliseconds = +interval * 60000;
    setInterval(async () => {
        try {
            await fetch(url);
        } catch {
            // do nothing
        }
    }, milliseconds);
};
