import {Service} from "typedi";
import UserRepository from "../repository/UserRepository";
import {IUser} from "../../Interfaces/AuthInterface";
import TokenService from "./TokenService";
import TokenBlackListRepository from "../repository/TokenBlackListRepository";
import TokenBlacklist from "../../database/model/TokenBlacklist";
import * as bcrypt from 'bcryptjs'
import AppError from "../Errors/AppError";

@Service()
export default class AuthService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly tokenBlackListRepo: TokenBlackListRepository
    ) {}
    async register(data: IUser): Promise<string> {
        const user = await this.userRepo.addUser(data)
        return TokenService.generateToken(user.id)
    }
    async login({email, password}: {
        email: string,
        password: string
    }): Promise<String> {
        const user = await this.userRepo.find(email);
        if(user && bcrypt.compareSync(password, user.password)){
            return TokenService.generateToken(user.id)
        }
        throw new AppError({statusCode: 401, message: "Invalid login credentials"})
    }
    async logout(token: string): Promise<TokenBlacklist>{
        return this.tokenBlackListRepo.add(token)
    }

    async isBlackListed(token: string):Promise<Boolean> {
        return !!(await this.tokenBlackListRepo.find(token));
    }
}