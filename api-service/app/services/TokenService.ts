import * as jwt from 'jsonwebtoken'
import {JwtPayload} from "jsonwebtoken";
import AppError from "../Errors/AppError";
export default class TokenService {
    static generateToken(userId: number){
        return jwt.sign({
            id: userId,
        }, process.env.JWT_SECRET ?? '', {
            expiresIn: '7d'
        })
    }

    static verifyToken(token: string): JwtPayload | string {
        try{
            return jwt.verify(token, process.env.JWT_SECRET ?? '')
        }catch (err: any){
            throw new AppError({message: err?.message})
        }
    }
}