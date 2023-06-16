import AuthService from "../services/AuthService";
import {Request, Response} from 'express';
import {Container, Service} from "typedi";

@Service()
class AuthController {
    constructor(private readonly authService: AuthService) {}
    async register(req: Request, res: Response) {
        const {name, email, password} = req.body
        const token = await this.authService.register({
            name,
            email,
            password
        });
        return res.json({
            token
        })
    }
    async logout(req: Request, res: Response){
        //@ts-ignore
        await this.authService.logout(req?.token)
        //@ts-ignore
        return res.json({message: 'Logged out'})
    }
}
export default Container.get(AuthController)