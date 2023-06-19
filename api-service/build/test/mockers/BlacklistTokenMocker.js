"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlacklistTokenMocker = void 0;
const TokenBlacklist_1 = __importDefault(require("../../database/model/TokenBlacklist"));
class BlacklistTokenMocker {
    static make(token) {
        return TokenBlacklist_1.default.build({
            token,
        });
    }
}
exports.BlacklistTokenMocker = BlacklistTokenMocker;
