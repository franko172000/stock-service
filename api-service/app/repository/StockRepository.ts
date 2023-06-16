import {Service} from "typedi";
import Stock from "../../database/model/Stock";
import {IStock} from "../../Interfaces/StockInterface";

@Service()
export default class StockRepository {

    async list (userId: number): Promise<Stock[]>{
        return Stock.findAll({
            where: {
                userId,
            }
        })
    }

    async add (data: IStock, userId: number): Promise<Stock>{
        return Stock.create({
            userId,
            ...data
        })
    }

    async aggregate (userId: number){
        return Stock.sequelize?.query(`SELECT COUNT(id) as times_requested, name as stock FROM history WHERE user_id=${userId} GROUP BY stock `)
    }
}