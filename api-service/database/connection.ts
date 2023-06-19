import { Sequelize } from 'sequelize-typescript';
import models from './model'

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    DB_HOST,
    DB_PORT
} = process.env;

const sequelizeCon = new Sequelize({
    host: DB_HOST,
    port: Number(DB_PORT || 3306),
    database: DB_DATABASE,
    dialect: 'mysql',
    username: DB_USERNAME,
    password: DB_PASSWORD,
    logging: false,
    models: [...models], // or [Player, Team],
})
export default sequelizeCon