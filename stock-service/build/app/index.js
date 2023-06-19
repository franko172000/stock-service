"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger = require('morgan');
const routes_1 = __importDefault(require("../routes"));
//load environment vars
const nodeenv = process.env.NODE_ENV;
const env = nodeenv === 'test' ? 'test' : nodeenv === 'docker' ? 'docker' : 'local';
require('dotenv').config({
    path: `${process.cwd()}/.env.${env}`,
});
const app = (0, express_1.default)();
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/', routes_1.default);
exports.default = app;
