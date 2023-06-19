import express from 'express';
const logger = require('morgan');
import routes from '../routes';

//load environment vars
const nodeenv = process.env.NODE_ENV;
const env = nodeenv === 'test' ? 'test' :  nodeenv === 'docker' ? 'docker' : 'local';
require('dotenv').config({
  path: `${process.cwd()}/.env.${env}`,
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', routes);

export default app;
