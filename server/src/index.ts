/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
require('source-map-support').install();

import app from './app';

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
