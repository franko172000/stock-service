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
const typedi_1 = require("typedi");
const axios_1 = __importDefault(require("axios"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const AppError_1 = __importDefault(require("../Errors/AppError"));
let StockService = class StockService {
    constructor() { }
    getStock(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get('https://stooq.com/q/l/?s=' + code + '&f=sd2t2ohlcvn&h&e=csv', { responseType: 'stream' });
                let csv = yield (0, csvtojson_1.default)().fromStream(response.data);
                return {
                    name: csv[0].Name,
                    symbol: csv[0].Symbol,
                    open: csv[0].Open,
                    high: csv[0].High,
                    low: csv[0].Low,
                    close: csv[0].Close,
                    time: csv[0].Time,
                    date: csv[0].Date,
                    volume: csv[0].Volume
                };
            }
            catch (err) {
                throw new AppError_1.default({ message: `Error fetching stock record - [${err.message}]` });
            }
        });
    }
};
StockService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], StockService);
exports.default = StockService;
