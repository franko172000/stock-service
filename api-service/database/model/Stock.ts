import {DataTypes} from "sequelize";
import BaseModel from "./BaseModel";
import {AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, PrimaryKey, Table} from "sequelize-typescript";
import User from "./User";
import {Service} from "typedi";

@Table({
    tableName: 'history',
})
@Service()
export default class Stock extends BaseModel {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    @ForeignKey(() => User)
    userId: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    name: string

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    symbol: string

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    time: string

    @Column({
        allowNull: false,
        type: DataTypes.DECIMAL
    })
    open: number

    @Column({
        allowNull: false,
        type: DataTypes.DECIMAL
    })
    high: number

    @Column({
        allowNull: false,
        type: DataTypes.DECIMAL
    })
    low: number

    @Column({
        allowNull: false,
        type: DataTypes.DECIMAL
    })
    close: number

    @Column({
        allowNull: false,
        type: DataTypes.INTEGER
    })
    volume: number

    @Column({
        allowNull: false,
        type: DataTypes.STRING
    })
    date: string

    @BelongsTo(() => User, { as: 'user' })
    user?: User;
}