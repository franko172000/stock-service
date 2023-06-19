"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const model_1 = __importDefault(require("../database/model"));
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'test_db',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: ':memory:',
    logging: false,
    models: [...model_1.default], // or [Player, Team],
});
exports.default = sequelize;
