import {Service} from "typedi";
import axios from 'axios';
import {IStock} from "../../Interfaces/StockInterface";
import csvToJson from "csvtojson";
import AppError from "../Errors/AppError";

@Service()
export default class StockService{
    constructor() {}

    async getStock(code: string): Promise<IStock | null>{
        try{
            const response = await axios.get('https://stooq.com/q/l/?s='+code+'&f=sd2t2ohlcvn&h&e=csv', {responseType: 'stream'})
            let csv = await csvToJson().fromStream(response.data)
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
            } as IStock
        }catch (err: any){
            throw new AppError({message: `Error fetching stock record - [${err.message}]`})
        }
    }

}