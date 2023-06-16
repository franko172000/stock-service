import AuthService from "../services/AuthService";
import {NextFunction, Request, Response} from 'express';
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
    async login(req: Request, res: Response, next: NextFunction){
        const {email, password} = req.body
        try{
            //@ts-ignore
            const token =await this.authService.login({
                email,
                password
            })
            return res.json({token})
        }catch (err: any){
            next(err)
        }
    }
    async logout(req: Request, res: Response){
        //@ts-ignore
        await this.authService.logout(req?.token)
        //@ts-ignore
        return res.json({message: 'Logged out'})
    }
}
export default Container.get(AuthController)