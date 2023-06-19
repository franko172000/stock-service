"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMocker = void 0;
const chance_1 = __importDefault(require("chance"));
const User_1 = __importDefault(require("../../database/model/User"));
const ch = new chance_1.default();
class UserMocker {
    static make(override = {}) {
        return User_1.default.build(Object.assign({ id: ch.integer({ min: 0, max: 20000 }), 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            email: ch.email(), 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            name: ch.name(), 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            password: ch.string() }, override));
    }
}
exports.UserMocker = UserMocker;
