import express from 'express';
const logger = require('morgan');
import routes from '../routes';

//load environment vars
require('dotenv').config({
  path: `${process.cwd()}/.env.local`,
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', routes);

export default app;
