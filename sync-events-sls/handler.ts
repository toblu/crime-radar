import { config } from 'dotenv';
config();
import serverless from 'serverless-http';
import app from './app';

module.exports = {
  run: serverless(app)
};
