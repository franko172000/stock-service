"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger = require('morgan');
const routes_1 = __importDefault(require("../routes"));
//load environment vars
const nodeEnv = process.env.NODE_ENV;
const env = nodeEnv === 'test' ? 'test' : nodeEnv === 'docker' ? 'docker' : 'local';
require('dotenv').config({
    path: `${process.cwd()}/.env.${env}`,
});
console.log("Stock Service App Loaded Environment - " + nodeEnv);
const app = (0, express_1.default)();
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/', routes_1.default);
exports.default = app;
