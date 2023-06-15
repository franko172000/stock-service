import User from "../../database/model/User";
import {Service} from "typedi";
import {IUser} from "../../Interfaces/AuthInterface";

@Service()
export default class UserRepository {
    async addUser (user: IUser): Promise<User>{
        return User.build({
            name: user.name,
            email: user.email,
            password: user.password
        }).save()
    }
}