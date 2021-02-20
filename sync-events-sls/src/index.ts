/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
require('source-map-support').install();

import app from './app';

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
