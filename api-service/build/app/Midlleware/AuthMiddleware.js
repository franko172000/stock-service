"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const AuthService_1 = __importDefault(require("../services/AuthService"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
const typedi_1 = require("typedi");
const AppError_1 = __importDefault(require("../Errors/AppError"));
let AuthMiddleware = class AuthMiddleware {
    constructor(authService) {
        this.authService = authService;
        this.message = 'Unable to authenticate request. Invalid or missing token';
    }
    validateToken(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const headerAuth = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const token = headerAuth ? headerAuth.split(' ')[1] : '';
            try {
                const data = TokenService_1.default.verifyToken(token);
                if (yield this.authService.isBlackListed(token)) {
                    const err = new AppError_1.default({ statusCode: 401, message: this.message });
                    return next(err);
                }
                //@ts-ignore
                req === null || req === void 0 ? void 0 : req.user = data;
                //@ts-ignore
                req === null || req === void 0 ? void 0 : req.token = token;
                return next();
            }
            catch (err) {
                err.statusCode = 401;
                err.message = this.message;
                return next(err);
            }
        });
    }
};
AuthMiddleware = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [AuthService_1.default])
], AuthMiddleware);
exports.default = typedi_1.Container.get(AuthMiddleware);
