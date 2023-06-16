import {Service} from "typedi";
import StockRepository from "../repository/StockRepository";
import axios from 'axios';
import {IStockResponse} from "../../Interfaces/StockInterface";

@Service()
export default class StockService{
    constructor(private readonly stockRepo: StockRepository) {}

    async getStock(code: string, userId: number): Promise<IStockResponse | null>{
        try{
            const response = await axios.get('https://stooq.com/q/l/?s='+code+'&f=sd2t2ohlcvn&h&e=json')
            const {symbols} = response.data
            const stock = await this.stockRepo.add({
                name: symbols[0].name,
                symbol: symbols[0].symbol,
                open: symbols[0].open,
                high: symbols[0].high,
                low: symbols[0].low,
                close: symbols[0].close,
                time: symbols[0].time,
                date: symbols[0].date,
                volume: symbols[0].volume
            }, userId);
            const  { name, high,low, symbol, close } = stock
            return {
                name,
                high,
                low,
                symbol,
                close,
            } as IStockResponse
        }catch (err){
            console.log(err)
        }
        return null;
    }
    async list (userId:number){
        return this.stockRepo.list(userId);
    }

    async aggregate (userId:number){
        return this.stockRepo.aggregate(userId);
    }
}