import express from 'express';
const logger = require('morgan');
import swaggerUi from "swagger-ui-express";
import routes from '../routes';
import * as swaggerDocument from "../swagger.json";

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
