"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMocker = void 0;
const Stock_1 = __importDefault(require("../../database/model/Stock"));
const chance_1 = __importDefault(require("chance"));
const ch = new chance_1.default();
class StockMocker {
    static make(userId) {
        return Stock_1.default.build({
            user_id: userId,
            name: ch.name(),
            symbol: ch.string({
                length: 4
            }),
            open: ch.floating(),
            high: ch.floating(),
            low: ch.floating(),
            close: ch.floating(),
            time: ch.timestamp(),
            date: ch.date().toDateString(),
            volume: ch.integer({ min: 0, max: 20000 })
        });
    }
}
exports.StockMocker = StockMocker;
