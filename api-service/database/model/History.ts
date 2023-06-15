import {DataTypes} from "sequelize";
import sequelize from '../connection'
import User from "./User";

const History = sequelize.define('History', {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    open: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    high: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    low: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    close: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    volume: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'history',
    timestamps: true
})
History.belongsTo(User)
export default History;