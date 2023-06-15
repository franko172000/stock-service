import {Sequelize} from "sequelize";

require('dotenv').config({
    path: `${process.cwd()}/.env.local`,
});

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    DB_HOST,
    DB_PORT
} = process.env;

const sequelizeCon = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: Number(DB_PORT || 3306),
    dialect: 'mysql',
    logging: false
})
try {
    sequelizeCon.authenticate()
}
catch (err){
    console.log('Error connecting to database', err)
    throw new Error("Error connecting to database")
}
export default sequelizeCon