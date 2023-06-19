"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stock_1 = __importDefault(require("./Stock"));
const User_1 = __importDefault(require("./User"));
const TokenBlacklist_1 = __importDefault(require("./TokenBlacklist"));
exports.default = [
    Stock_1.default,
    User_1.default,
    TokenBlacklist_1.default
];
