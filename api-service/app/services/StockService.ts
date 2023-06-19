import {Service} from "typedi";
import StockRepository from "../repository/StockRepository";
import axios from 'axios';
import {IStockResponse} from "../../Interfaces/StockInterface";
import AppError from "../Errors/AppError";

@Service()
export default class StockService{
    constructor(private readonly stockRepo: StockRepository) {}

    async getStock(code: string, userId: number): Promise<IStockResponse | null>{
        try{
            const {data} = await axios.get(`${process.env.STOCK_SERVICE_BASE_URL}/api/internal/stock?code=${code}`)
            //save record to db
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

            const  { name, high,low, symbol, close, open } = stock
            return {
                name,
                high,
                low,
                symbol,
                close,
                open
            } as IStockResponse
        }catch (err: any){
            throw new AppError({message: err.message})
        }
    }
    async list (userId:number){
        return this.stockRepo.list(userId);
    }

    async aggregate (userId:number){
        return this.stockRepo.aggregate(userId);
    }
}