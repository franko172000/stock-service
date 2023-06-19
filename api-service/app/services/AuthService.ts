import {Service} from "typedi";
import UserRepository from "../repository/UserRepository";
import {IUser} from "../../Interfaces/AuthInterface";
import TokenService from "./TokenService";
import TokenBlackListRepository from "../repository/TokenBlackListRepository";
import TokenBlacklist from "../../database/model/TokenBlacklist";
import * as bcrypt from 'bcryptjs'
import AppError from "../Errors/AppError";
import MailerService from "./MailerService";

@Service()
export default class AuthService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly tokenBlackListRepo: TokenBlackListRepository,
        private readonly mailer: MailerService
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

    async resetPassword(email: string): Promise<void>{
        const user = await this.userRepo.find(email);
        if(user){
            const code = Math.floor(Math.random() * 90000 + 10000)
            const message = `
                <p>Hello ${user.name}</p>
                <p>You requested for a password reset, please enter the conde below on the password reset page to reset your password</p>
                <p><b>${code}</b></p>
            `
            this.mailer.sendMail('Password reset', message, email)
            return
        }
        throw new AppError({statusCode: 404, message: 'Email does not exist!'})
    }

    async isBlackListed(token: string):Promise<Boolean> {
        return !!(await this.tokenBlackListRepo.find(token));
    }
}