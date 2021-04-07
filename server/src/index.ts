/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
require('source-map-support').install();

import app from './app';

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
