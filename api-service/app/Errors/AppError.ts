import {NextFunction, Request, Response} from "express";

export default class AppError extends Error{
    statusCode: number;

    constructor({statusCode, message}:{statusCode?:number, message: string}) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode || 500;
        Error.captureStackTrace(this);
    }
}