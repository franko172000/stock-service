import {DataTypes} from "sequelize";
import sequelize from '../connection'
import History from "./History";

const User = sequelize.define('User', {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'users',
    timestamps: true
})
User.hasMany(History)
export default User;