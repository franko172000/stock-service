"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const sinon = __importStar(require("sinon"));
const UserMocker_1 = require("../mockers/UserMocker");
const TestSetup_1 = __importDefault(require("../TestSetup"));
const StockRepository_1 = __importDefault(require("../../app/repository/StockRepository"));
const StockService_1 = __importDefault(require("../../app/services/StockService"));
const StockMocker_1 = require("../mockers/StockMocker");
const axios_1 = __importDefault(require("axios"));
const AppError_1 = __importDefault(require("../../app/Errors/AppError"));
describe('Stock Service Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestSetup_1.default.initDb();
    }));
    const setUp = () => {
        const stockRepo = sinon.createStubInstance(StockRepository_1.default);
        const stockService = new StockService_1.default(stockRepo);
        return {
            stockRepo,
            stockService
        };
    };
    afterEach(() => {
        sinon.restore();
    });
    afterAll(() => {
        TestSetup_1.default.closeDb();
    });
    it('should get stock', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { stockRepo, stockService } = setUp();
            const user = UserMocker_1.UserMocker.make();
            const stock = StockMocker_1.StockMocker.make(user.id);
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
            stockRepo.add
                .withArgs(stockData, user.id)
                .resolves(stock);
            sinon.stub(axios_1.default, 'get')
                .withArgs(`${process.env.STOCK_SERVICE_BASE_URL}/api/internal/stock?code=${code}`)
                .resolves(Promise.resolve({
                data: stockData
            }));
            const response = yield stockService.getStock(code, user.id);
            expect(stock.name).toEqual(response === null || response === void 0 ? void 0 : response.name);
            expect(stock.high).toEqual(response === null || response === void 0 ? void 0 : response.high);
            expect(stock.low).toEqual(response === null || response === void 0 ? void 0 : response.low);
            expect(stock.symbol).toEqual(response === null || response === void 0 ? void 0 : response.symbol);
            expect(stock.close).toEqual(response === null || response === void 0 ? void 0 : response.close);
        });
    });
    it('should throw error if request fails', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { stockRepo, stockService } = setUp();
            const user = UserMocker_1.UserMocker.make();
            const stock = StockMocker_1.StockMocker.make(user.id);
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
            stockRepo.add
                .withArgs(stockData, user.id)
                .resolves(stock);
            sinon.stub(axios_1.default, 'get')
                .withArgs(`${process.env.STOCK_SERVICE_BASE_URL}/stock?q=${code}`)
                .resolves(Promise.resolve({
                data: stockData
            }));
            yield expect(stockService.getStock(code, user.id)).rejects.toThrow(AppError_1.default);
        });
    });
    it('should list stock history', function () {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const { stockRepo, stockService } = setUp();
            const user = UserMocker_1.UserMocker.make();
            const stock = StockMocker_1.StockMocker.make(user.id);
            stockRepo.list
                .withArgs(user.id)
                .resolves([stock]);
            const response = yield stockService.list(user.id);
            expect(stock.name).toEqual((_a = response[0]) === null || _a === void 0 ? void 0 : _a.name);
            expect(stock.high).toEqual((_b = response[0]) === null || _b === void 0 ? void 0 : _b.high);
            expect(stock.low).toEqual((_c = response[0]) === null || _c === void 0 ? void 0 : _c.low);
            expect(stock.symbol).toEqual((_d = response[0]) === null || _d === void 0 ? void 0 : _d.symbol);
            expect(stock.close).toEqual((_e = response[0]) === null || _e === void 0 ? void 0 : _e.close);
        });
    });
    it('should aggregate stocks', function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const { stockRepo, stockService } = setUp();
            const user = UserMocker_1.UserMocker.make();
            const stock1 = StockMocker_1.StockMocker.make(user.id);
            const stock2 = StockMocker_1.StockMocker.make(user.id);
            stockRepo.aggregate
                .withArgs(user.id)
                .resolves([
                {
                    times_requested: 1,
                    stock: stock1.name,
                },
                {
                    times_requested: 1,
                    stock: stock2.name,
                }
            ]);
            const response = yield stockService.aggregate(user.id);
            expect((_a = response[0]) === null || _a === void 0 ? void 0 : _a.stock).toEqual(stock1.name);
            expect((_b = response[0]) === null || _b === void 0 ? void 0 : _b.times_requested).toEqual(1);
            expect((_c = response[1]) === null || _c === void 0 ? void 0 : _c.stock).toEqual(stock2.name);
            expect((_d = response[1]) === null || _d === void 0 ? void 0 : _d.times_requested).toEqual(1);
        });
    });
});
