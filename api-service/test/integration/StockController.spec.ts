import app from '../../app'
import request from 'supertest'
import nock from 'nock'
import TestSetup from "../TestSetup";
import {UserMocker} from "../mockers/UserMocker";
import TokenService from "../../app/services/TokenService";
import {StockMocker} from "../mockers/StockMocker";
import Stock from "../../database/model/Stock";

describe('Stock Controller Test', ()=>{
    const basePath = '/api/stock';

    beforeAll(async ()=>{
       await TestSetup.initDb()
    });

    const nokStockRequest = async (code: string, reply: any) => {
        await nock(process.env.STOCK_SERVICE_BASE_URL ?? '')
            .get(`/api/internal/stock?code=${code}`)
            .reply(200, reply)
    }
    afterAll(async ()=>{
        await TestSetup.closeDb()
    });

    it('Should get and save stock db', async ()=>{
        const user = await UserMocker.make().save();
        const stock = StockMocker.make(user.id);
        const token = TokenService.generateToken(user.id)
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
        }

        await nokStockRequest(code, stockData)
        const response = await request(app)
            .get(`${basePath}?q=${code}`)
            .set('Authorization', 'Bearer ' + token)

        const newStock: Stock|null = await Stock.findOne({
            where: {
                id: 1
            }
        })

        expect(response.status).toEqual(200)
        expect(response.body).toEqual(expect.objectContaining({
            name: stock.name,
            symbol: stock.symbol,
            open: stock.open,
            high: stock.high,
            low: stock.low,
            close: stock.close
        }))
        expect(newStock?.name).toEqual(stockData.name)
        expect(newStock?.symbol).toEqual(stockData.symbol)
        expect(newStock?.open).toEqual(stockData.open)
        expect(newStock?.userId).toEqual(user.id)
    })

    it('Should return stock history', async ()=>{
        const user = await UserMocker.make().save();
        const stock = await StockMocker.make(user.id).save();
        const token = TokenService.generateToken(user.id)

        const response = await request(app)
            .get(`${basePath}/history`)
            .set('Authorization', 'Bearer ' + token)

        expect(response.status).toEqual(200)
        expect(typeof response.body).toEqual('object')
        response.body.map((stockRes:any) => {
            expect(stockRes).toEqual(expect.objectContaining({
                name: stock.name,
                symbol: stock.symbol,
                high: stock.high,
                low: stock.low,
                close: stock.close
            }))
        })
    })
})