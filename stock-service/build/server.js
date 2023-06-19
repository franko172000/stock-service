"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const ErrorHandler_1 = __importDefault(require("./app/Errors/ErrorHandler"));
const port = process.env.APP_PORT || '3002';
// Handle application errors
ErrorHandler_1.default.init(app_1.default);
//start application
app_1.default.listen(port, () => {
    console.log("Stock service is running " + port + " and ready for connection");
});
