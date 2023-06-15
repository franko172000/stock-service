import {Service, Container} from "typedi";
import UserRepository from "../repository/UserRepository";
import {IUser} from "../../Interfaces/AuthInterface";

@Service()
export default class AuthService {
    constructor(private readonly userRepo: UserRepository) {}
    async register(user: IUser){
        try{
            console.log("hello")
            await this.userRepo.addUser(user)
            return 'token';
        }catch (err){
            console.log(err)
        }
    }
    async login() {

    }
    async logout(){

    }
    async validateToken(token: string):Promise<boolean> {
        return true
    }

    async isBlackListed(token: string):Promise<boolean> {
        return true
    }
}
// export default Container.get(AuthService)