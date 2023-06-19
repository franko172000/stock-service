import {NextFunction, Request, Response} from 'express';
import {Container, Service} from "typedi";
import StockService from "../services/StockService";

@Service()
class StockController {
    constructor(private readonly stockService: StockService) {}
    async getStock(req: Request, res: Response, next: NextFunction) {
        const {q} = req.query
        try{
            //@ts-ignore
            const stock = await this.stockService.getStock(q as string, req?.user?.id as number)
            return res.json(stock)
        }catch (err: any){
            next(err)
        }
    }

    async getHistory(req: Request, res: Response) {
        //@ts-ignore
        const stock = await this.stockService.list(req?.user?.id as number)
        if(stock){
            return res.json(stock)
        }
        return res.json({error: 'Error fetching history'}).status(500)
    }

    async aggregate(req: Request, res: Response) {
        //@ts-ignore
        const stock = await this.stockService.aggregate(req?.user?.id as number)
        console.log(stock)
        if(stock){
            return res.json(stock[0])
        }

        return res.json({error: 'Error fetching aggregate'}).status(500)
    }

}
export default Container.get(StockController)