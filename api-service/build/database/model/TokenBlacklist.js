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
const sequelize_typescript_1 = require("sequelize-typescript");
const BaseModel_1 = __importDefault(require("./BaseModel"));
const typedi_1 = require("typedi");
const sequelize_1 = require("sequelize");
let TokenBlacklist = class TokenBlacklist extends BaseModel_1.default {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TokenBlacklist.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    }),
    __metadata("design:type", String)
], TokenBlacklist.prototype, "token", void 0);
TokenBlacklist = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'token_blacklist',
    }),
    (0, typedi_1.Service)()
], TokenBlacklist);
exports.default = TokenBlacklist;
