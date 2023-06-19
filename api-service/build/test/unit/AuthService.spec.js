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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const sinon = __importStar(require("sinon"));
const UserRepository_1 = __importDefault(require("../../app/repository/UserRepository"));
const TokenBlackListRepository_1 = __importDefault(require("../../app/repository/TokenBlackListRepository"));
const AuthService_1 = __importDefault(require("../../app/services/AuthService"));
const UserMocker_1 = require("../mockers/UserMocker");
const TokenService_1 = __importDefault(require("../../app/services/TokenService"));
const TestSetup_1 = __importDefault(require("../TestSetup"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const BlacklistTokenMocker_1 = require("../mockers/BlacklistTokenMocker");
const MailerService_1 = __importDefault(require("../../app/services/MailerService"));
describe('Auth Service Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestSetup_1.default.initDb();
    }));
    const setUp = () => {
        const userRepo = sinon.createStubInstance(UserRepository_1.default);
        const tokenBlackListRepo = sinon.createStubInstance(TokenBlackListRepository_1.default);
        const mailService = sinon.createStubInstance(MailerService_1.default);
        const authService = new AuthService_1.default(userRepo, tokenBlackListRepo, mailService);
        return {
            userRepo,
            tokenBlackListRepo,
            authService
        };
    };
    afterEach(() => {
        sinon.restore();
    });
    afterAll(() => {
        TestSetup_1.default.closeDb();
    });
    it('should create new user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { userRepo, authService } = setUp();
            const user = UserMocker_1.UserMocker.make();
            const token = TokenService_1.default.generateToken(user.id);
            userRepo.addUser
                .withArgs(user)
                .resolves(user);
            sinon.stub(TokenService_1.default, 'generateToken')
                .withArgs(user.id)
                .returns(token);
            const response = yield authService.register(user);
            expect(token).toEqual(response);
        });
    });
    it('should login user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { userRepo, authService } = setUp();
            const user = UserMocker_1.UserMocker.make();
            const token = TokenService_1.default.generateToken(user.id);
            userRepo.find
                .withArgs(user.email)
                .resolves(user);
            sinon.stub(TokenService_1.default, 'generateToken')
                .withArgs(user.id)
                .returns(token);
            sinon.stub(bcryptjs_1.default, 'compareSync').returns(true);
            const response = yield authService.login({
                email: user.email,
                password: user.password
            });
            expect(token).toEqual(response);
        });
    });
    it('should fail login user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { userRepo, authService } = setUp();
            const user = UserMocker_1.UserMocker.make();
            userRepo.find
                .withArgs('fake@email.com')
                .resolves(user);
            sinon.stub(bcryptjs_1.default, 'compareSync').returns(false);
            userRepo.find
                .withArgs('fake@email.com')
                .resolves(user);
            yield expect(authService.login({
                email: 'fake@email.com',
                password: user.password
            })).rejects.toThrow('Invalid login credentials');
        });
    });
    it('should logout user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { tokenBlackListRepo, authService } = setUp();
            const user = UserMocker_1.UserMocker.make();
            const token = TokenService_1.default.generateToken(user.id);
            const tokenBlackList = BlacklistTokenMocker_1.BlacklistTokenMocker.make(token);
            tokenBlackListRepo.add
                .withArgs(token)
                .resolves(tokenBlackList);
            const result = yield authService.logout(token);
            yield expect(token).toEqual(result.token);
        });
    });
    it('should return true if token is blacklisted', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { tokenBlackListRepo, authService } = setUp();
            const user = UserMocker_1.UserMocker.make();
            const token = TokenService_1.default.generateToken(user.id);
            const tokenBlackList = BlacklistTokenMocker_1.BlacklistTokenMocker.make(token);
            tokenBlackListRepo.find
                .withArgs(token)
                .resolves(tokenBlackList);
            const result = yield authService.isBlackListed(token);
            yield expect(true).toEqual(result);
        });
    });
    it('should return false if token is not blacklisted', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { tokenBlackListRepo, authService } = setUp();
            const user = UserMocker_1.UserMocker.make();
            const token = TokenService_1.default.generateToken(user.id);
            tokenBlackListRepo.find
                .withArgs(token);
            const result = yield authService.isBlackListed(token);
            yield expect(false).toEqual(result);
        });
    });
});
