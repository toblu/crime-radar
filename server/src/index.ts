/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
require('source-map-support').install();

import app from './app';
import { keepAwake } from './util';

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
    keepAwake();
    console.log(`Server is listening on port ${port}`);
});
