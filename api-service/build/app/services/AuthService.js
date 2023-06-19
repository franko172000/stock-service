"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const typedi_1 = require("typedi");
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const TokenService_1 = __importDefault(require("./TokenService"));
const TokenBlackListRepository_1 = __importDefault(require("../repository/TokenBlackListRepository"));
const bcrypt = __importStar(require("bcryptjs"));
const AppError_1 = __importDefault(require("../Errors/AppError"));
const MailerService_1 = __importDefault(require("./MailerService"));
let AuthService = class AuthService {
    constructor(userRepo, tokenBlackListRepo, mailer) {
        this.userRepo = userRepo;
        this.tokenBlackListRepo = tokenBlackListRepo;
        this.mailer = mailer;
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.find(data.email);
            if (!user) {
                const user = yield this.userRepo.addUser(data);
                return TokenService_1.default.generateToken(user.id);
            }
            throw new AppError_1.default({ statusCode: 409, message: "Email already exists" });
        });
    }
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.find(email);
            if (user && bcrypt.compareSync(password, user.password)) {
                return TokenService_1.default.generateToken(user.id);
            }
            throw new AppError_1.default({ statusCode: 401, message: "Invalid login credentials" });
        });
    }
    logout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokenBlackListRepo.add(token);
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.find(email);
            if (user) {
                const code = Math.floor(Math.random() * 90000 + 10000);
                const message = `
                <p>Hello ${user.name}</p>
                <p>You requested for a password reset, please enter the conde below on the password reset page to reset your password</p>
                <p><b>${code}</b></p>
            `;
                yield this.mailer.sendMail('Password reset', message, email);
                return;
            }
            throw new AppError_1.default({ statusCode: 404, message: 'Email does not exist!' });
        });
    }
    isBlackListed(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this.tokenBlackListRepo.find(token));
        });
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [UserRepository_1.default,
        TokenBlackListRepository_1.default,
        MailerService_1.default])
], AuthService);
exports.default = AuthService;
