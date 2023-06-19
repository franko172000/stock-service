import { Sequelize } from 'sequelize-typescript';
import models from '../database/model'

const sequelize = new Sequelize({
    database: 'test_db',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: ':memory:',
    logging: false,
    models: [...models], // or [Player, Team],
});
export default sequelize