"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const BaseModel_1 = __importDefault(require("./BaseModel"));
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("./User"));
const typedi_1 = require("typedi");
let Stock = class Stock extends BaseModel_1.default {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Stock.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    __metadata("design:type", Number)
], Stock.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    }),
    __metadata("design:type", String)
], Stock.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    }),
    __metadata("design:type", String)
], Stock.prototype, "symbol", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    }),
    __metadata("design:type", String)
], Stock.prototype, "time", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL
    }),
    __metadata("design:type", Number)
], Stock.prototype, "open", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL
    }),
    __metadata("design:type", Number)
], Stock.prototype, "high", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL
    }),
    __metadata("design:type", Number)
], Stock.prototype, "low", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL
    }),
    __metadata("design:type", Number)
], Stock.prototype, "close", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    }),
    __metadata("design:type", Number)
], Stock.prototype, "volume", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    }),
    __metadata("design:type", String)
], Stock.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.default, { as: 'user' }),
    __metadata("design:type", User_1.default)
], Stock.prototype, "user", void 0);
Stock = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'history',
    }),
    (0, typedi_1.Service)()
], Stock);
exports.default = Stock;
