import { config } from 'dotenv';
config();

import app from './src/app';

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
