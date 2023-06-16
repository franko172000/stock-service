import express, {NextFunction, Request, Response} from "express";
import AppError from "./AppError";

export default class ErrorHandler {
    static init(app: express.Application){
        const self = ErrorHandler
        app.use(self.errorLogger)
        app.use(self.errorResponder)
        app.use(self.invalidRouteHandler)
    }

    // Attach the first Error handling Middleware
    // function defined above (which logs the error)
    private static errorLogger (error: Error, request: Request, response: Response, next: NextFunction){
        console.log( `error ${error.message}`)
        next(error) // calling next middleware
    }

    // Attach the second Error handling Middleware
    // function defined above (which sends back the response)
    private static errorResponder(error: AppError, request: Request, response: Response, next: NextFunction){
        const status = error.statusCode
        //@ts-ignore
        const details = error?.details
        response.status(status).json({message: error.message, details})
    }

    // Attach the fallback Middleware
    // function which sends back the response for invalid paths)
    private static invalidRouteHandler(request: Request, response: Response, next: NextFunction){
        response.status(404).json({message: 'Route does not exists'})
    }
}