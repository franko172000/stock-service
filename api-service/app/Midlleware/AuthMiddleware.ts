import AuthService from "../services/AuthService";
import {NextFunction, Request, Response} from "express";
import TokenService from "../services/TokenService";
import {Container, Service} from "typedi";
import AppError from "../Errors/AppError";

@Service()
class AuthMiddleware {
    private message = 'Unable to authenticate request. Invalid or missing token';
    constructor(private readonly authService: AuthService) {}

    async validateToken(req: Request, res: Response, next: NextFunction) {
        const headerAuth = req.headers?.authorization
        const token = headerAuth ? headerAuth.split(' ')[1] : '';
        try{
            const data = TokenService.verifyToken(token);
            if(await this.authService.isBlackListed(token)){
                const err = new AppError({statusCode: 401, message: this.message})
                return next(err)
            }
            //@ts-ignore
            req?.user = data
            //@ts-ignore
            req?.token = token
            return next()
        }catch (err: any){
            err.statusCode = 401
            err.message = this.message
            return next(err)
        }
    }
}
export default Container.get(AuthMiddleware)