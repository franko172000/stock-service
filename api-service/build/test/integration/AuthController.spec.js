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
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const chance_1 = __importDefault(require("chance"));
const TestSetup_1 = __importDefault(require("../TestSetup"));
const UserMocker_1 = require("../mockers/UserMocker");
const TokenBlacklist_1 = __importDefault(require("../../database/model/TokenBlacklist"));
const TokenService_1 = __importDefault(require("../../app/services/TokenService"));
const ch = new chance_1.default();
describe('Auth Controller Test', () => {
    const basePath = '/api/auth/';
    //const app = require('../../app')
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //await connection.sync();
        yield TestSetup_1.default.initDb();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //await connection.close();
        yield TestSetup_1.default.closeDb();
    }));
    it('Should register user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post(`${basePath}register`)
            .send({
            email: 'test123@gmail.com',
            name: 'Test',
            password: 'test'
        });
        expect(response.status).toEqual(201);
        expect(typeof response.body.token).toEqual('string');
    }));
    it('Should login user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserMocker_1.UserMocker.make({
            password: 'test'
        }).save();
        const response = yield (0, supertest_1.default)(app_1.default).post(`${basePath}login`)
            .send({
            email: user.email,
            password: 'test'
        });
        expect(response.status).toEqual(200);
        expect(typeof response.body.token).toEqual('string');
    }));
    it('Should logout user and blacklist token', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserMocker_1.UserMocker.make({
            password: 'test'
        }).save();
        const token = TokenService_1.default.generateToken(user.id);
        const response = yield (0, supertest_1.default)(app_1.default).post(`${basePath}logout`)
            .set('Authorization', 'Bearer ' + token);
        const blackListToken = yield TokenBlacklist_1.default.findOne({
            where: {
                token
            }
        });
        expect(response.status).toEqual(200);
        expect(blackListToken === null || blackListToken === void 0 ? void 0 : blackListToken.token).toEqual(token);
    }));
});
