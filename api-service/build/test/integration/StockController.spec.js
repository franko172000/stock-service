"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const nock_1 = __importDefault(require("nock"));
const TestSetup_1 = __importDefault(require("../TestSetup"));
const UserMocker_1 = require("../mockers/UserMocker");
const TokenService_1 = __importDefault(require("../../app/services/TokenService"));
const StockMocker_1 = require("../mockers/StockMocker");
const Stock_1 = __importDefault(require("../../database/model/Stock"));
describe('Stock Controller Test', () => {
    const basePath = '/api/stock';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestSetup_1.default.initDb();
    }));
    const nokStockRequest = (code, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield (0, nock_1.default)((_a = process.env.STOCK_SERVICE_BASE_URL) !== null && _a !== void 0 ? _a : '')
            .get(`/api/internal/stock?code=${code}`)
            .reply(200, reply);
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestSetup_1.default.closeDb();
    }));
    it('Should get and save stock db', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserMocker_1.UserMocker.make().save();
        const stock = StockMocker_1.StockMocker.make(user.id);
        const token = TokenService_1.default.generateToken(user.id);
        const code = 'appl.us';
        const stockData = {
            name: stock.name,
            symbol: stock.symbol,
            open: stock.open,
            high: stock.high,
            low: stock.low,
            close: stock.close,
            time: stock.time,
            date: stock.date,
            volume: stock.volume
        };
        yield nokStockRequest(code, stockData);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`${basePath}?q=${code}`)
            .set('Authorization', 'Bearer ' + token);
        const newStock = yield Stock_1.default.findOne({
            where: {
                id: 1
            }
        });
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: stock.name,
            symbol: stock.symbol,
            open: stock.open,
            high: stock.high,
            low: stock.low,
            close: stock.close
        }));
        expect(newStock === null || newStock === void 0 ? void 0 : newStock.name).toEqual(stockData.name);
        expect(newStock === null || newStock === void 0 ? void 0 : newStock.symbol).toEqual(stockData.symbol);
        expect(newStock === null || newStock === void 0 ? void 0 : newStock.open).toEqual(stockData.open);
        expect(newStock === null || newStock === void 0 ? void 0 : newStock.userId).toEqual(user.id);
    }));
    it('Should return stock history', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserMocker_1.UserMocker.make().save();
        const stock = yield StockMocker_1.StockMocker.make(user.id).save();
        const token = TokenService_1.default.generateToken(user.id);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`${basePath}/history`)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toEqual(200);
        expect(typeof response.body).toEqual('object');
        response.body.map((stockRes) => {
            expect(stockRes).toEqual(expect.objectContaining({
                name: stock.name,
                symbol: stock.symbol,
                high: stock.high,
                low: stock.low,
                close: stock.close
            }));
        });
    }));
});
