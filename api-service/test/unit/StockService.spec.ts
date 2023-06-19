import * as sinon from 'sinon';
import {UserMocker} from "../mockers/UserMocker";
import TestSetup from "../TestSetup";
import StockRepository from "../../app/repository/StockRepository";
import StockService from "../../app/services/StockService";
import {StockMocker} from "../mockers/StockMocker";
import axios from "axios";
import {IStock} from "../../Interfaces/StockInterface";
import AppError from "../../app/Errors/AppError";

describe('Stock Service Test', ()=> {
    beforeAll(async ()=>{
        await TestSetup.initDb()
    });

    const setUp = ()=>{
        const stockRepo = sinon.createStubInstance(StockRepository)
        const stockService = new StockService(stockRepo);
        return {
            stockRepo,
            stockService
        }
    }

    afterEach(()=>{
        sinon.restore();
    })
    
    afterAll(()=>{
        TestSetup.closeDb()
    });

    it('should get stock', async function () {
        const {stockRepo, stockService} = setUp();
        const user = UserMocker.make();
        const stock = StockMocker.make(user.id);
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
        } as IStock

        stockRepo.add
            .withArgs(stockData, user.id)
            .resolves(stock)

        sinon.stub(axios, 'get')
            .withArgs(`${process.env.STOCK_SERVICE_BASE_URL}/api/internal/stock?code=${code}`)
            .resolves(Promise.resolve({
                data: stockData
            }))

        const response = await stockService.getStock(code, user.id)
        expect(stock.name).toEqual(response?.name)
        expect(stock.high).toEqual(response?.high)
        expect(stock.low).toEqual(response?.low)
        expect(stock.symbol).toEqual(response?.symbol)
        expect(stock.close).toEqual(response?.close)
    });

    it('should throw error if request fails', async function () {
        const {stockRepo, stockService} = setUp();
        const user = UserMocker.make();
        const stock = StockMocker.make(user.id);
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
        } as IStock

        stockRepo.add
            .withArgs(stockData, user.id)
            .resolves(stock)

        sinon.stub(axios, 'get')
            .withArgs(`${process.env.STOCK_SERVICE_BASE_URL}/stock?q=${code}`)
            .resolves(Promise.resolve({
                data: stockData
            }))

        await expect(stockService.getStock(code, user.id)).rejects.toThrow(AppError)
    });

    it('should list stock history', async function () {
        const {stockRepo, stockService} = setUp();
        const user = UserMocker.make();
        const stock = StockMocker.make(user.id);

        stockRepo.list
            .withArgs(user.id)
            .resolves([stock])

        const response = await stockService.list(user.id)
        expect(stock.name).toEqual(response[0]?.name)
        expect(stock.high).toEqual(response[0]?.high)
        expect(stock.low).toEqual(response[0]?.low)
        expect(stock.symbol).toEqual(response[0]?.symbol)
        expect(stock.close).toEqual(response[0]?.close)
    });

    it('should aggregate stocks', async function () {
        const {stockRepo, stockService} = setUp();
        const user = UserMocker.make();
        const stock1 = StockMocker.make(user.id);
        const stock2 = StockMocker.make(user.id);

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
            ])

        const response = await stockService.aggregate(user.id)
        expect(response[0]?.stock).toEqual(stock1.name)
        expect(response[0]?.times_requested).toEqual(1)
        expect(response[1]?.stock).toEqual(stock2.name)
        expect(response[1]?.times_requested).toEqual(1)
    });
})