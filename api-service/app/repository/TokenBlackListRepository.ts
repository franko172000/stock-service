import User from "../../database/model/User";
import {Service} from "typedi";
import {IUser} from "../../Interfaces/AuthInterface";
import TokenBlacklist from "../../database/model/TokenBlacklist";

@Service()
export default class TokenBlackListRepository {
    async find (token: string): Promise<TokenBlacklist | null>{
        return TokenBlacklist.findOne({
            where: {
                token,
            }
        })
    }

    async add (token: string): Promise<TokenBlacklist>{
        return TokenBlacklist.create({
            token,
        })
    }
}