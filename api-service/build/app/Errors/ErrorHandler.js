"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    static init(app) {
        const self = ErrorHandler;
        app.use(self.errorLogger);
        app.use(self.errorResponder);
        app.use(self.invalidRouteHandler);
    }
    // Attach the first Error handling Middleware
    // function defined above (which logs the error)
    static errorLogger(error, request, response, next) {
        console.log(`error ${error.message}`);
        next(error); // calling next middleware
    }
    // Attach the second Error handling Middleware
    // function defined above (which sends back the response)
    static errorResponder(error, request, response, next) {
        const status = error.statusCode;
        //@ts-ignore
        const details = error === null || error === void 0 ? void 0 : error.details;
        response.status(status).json({ message: error.message, details });
    }
    // Attach the fallback Middleware
    // function which sends back the response for invalid paths)
    static invalidRouteHandler(request, response, next) {
        response.status(404).json({ message: 'Route does not exists' });
    }
}
exports.default = ErrorHandler;
