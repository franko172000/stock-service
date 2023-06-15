require('dotenv').config({
  path: `${process.cwd()}/.env.local`,
});
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env;
module.exports = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  port:  3306,
  dialect: 'mysql',
};
