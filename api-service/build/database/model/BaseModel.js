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
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const sequelize_typescript_1 = require("sequelize-typescript");
let BaseModel = class BaseModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    (0, class_transformer_1.Transform)((params) => {
        return params.value.toISOString();
    }, {
        toPlainOnly: true,
    }),
    __metadata("design:type", Date)
], BaseModel.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    (0, class_transformer_1.Transform)((params) => {
        return params.value
            ? params.value.toISOString()
            : null;
    }, {
        toPlainOnly: true,
    }),
    __metadata("design:type", Object)
], BaseModel.prototype, "updatedAt", void 0);
BaseModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        underscored: true,
    })
], BaseModel);
exports.default = BaseModel;
