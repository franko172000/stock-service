"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const connection_1 = __importDefault(require("./database/connection"));
const ErrorHandler_1 = __importDefault(require("./app/Errors/ErrorHandler"));
const port = process.env.APP_PORT || '3009';
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.sync();
        // Handle application errors
        ErrorHandler_1.default.init(app_1.default);
        //start application
        app_1.default.listen(port, () => {
            console.log("Server running on port - " + port);
        });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
void startApp();