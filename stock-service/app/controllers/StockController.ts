import {NextFunction, Request, Response} from 'express';
import {Container, Service} from "typedi";
import StockService from "../services/StockService";

@Service()
class StockController {
    constructor(private readonly stockService: StockService) {}
    async getStock(req: Request, res: Response, next: NextFunction) {
        const {code} = req.query
        try{
            //@ts-ignore
            const stock = await this.stockService.getStock(stock_code as string)
            return res.json(stock)
        }catch (err){
            next(err)
        }
    }
}
export default Container.get(StockController)