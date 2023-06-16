import * as bcrypt from 'bcryptjs';
import {AutoIncrement, BeforeCreate, Column, HasMany, PrimaryKey, Table} from "sequelize-typescript";
import BaseModel from "./BaseModel";
import {Service} from "typedi";
import Stock from "./Stock";
import {DataTypes} from "sequelize";

@Table({
    tableName: 'token_blacklist',
})
@Service()
export default class TokenBlacklist extends BaseModel {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    token: string
}