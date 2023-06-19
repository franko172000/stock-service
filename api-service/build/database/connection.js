"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const model_1 = __importDefault(require("./model"));
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env;
const sequelizeCon = new sequelize_typescript_1.Sequelize({
    host: DB_HOST,
    port: Number(DB_PORT || 3306),
    database: DB_DATABASE,
    dialect: 'mysql',
    username: DB_USERNAME,
    password: DB_PASSWORD,
    logging: false,
    models: [...model_1.default], // or [Player, Team],
});
exports.default = sequelizeCon;
