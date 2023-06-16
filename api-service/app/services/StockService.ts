import {Service} from "typedi";
import StockRepository from "../repository/StockRepository";
import axios from 'axios';
import {IStockResponse} from "../../Interfaces/StockInterface";

@Service()
export default class StockService{
    private readonly stockPath
    constructor(private readonly stockRepo: StockRepository) {
        this.stockPath = process.env.STOCK_SERVICE_BASE_URL
    }

    async getStock(code: string, userId: number): Promise<IStockResponse | null>{
        try{
            const {data} = await axios.get(`${this.stockPath}/stock?code=${code}`)
            const stock = await this.stockRepo.add({
                name: data.name,
                symbol: data.symbol,
                open: data.open,
                high: data.high,
                low: data.low,
                close: data.close,
                time: data.time,
                date: data.date,
                volume: data.volume
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