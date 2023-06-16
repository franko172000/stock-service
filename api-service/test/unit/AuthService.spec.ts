import * as sinon from 'sinon';
import UserRepository from "../../app/repository/UserRepository";
import TokenBlackListRepository from "../../app/repository/TokenBlackListRepository";
import AuthService from "../../app/services/AuthService";
import {UserMocker} from "../mockers/UserMocker";
import TokenService from "../../app/services/TokenService";
import TestSetup from "../TestSetup";
import {TokenMocker} from "../mockers/TokenMocker";
import bcrypt from 'bcryptjs'
import {BlacklistTokenMocker} from "../mockers/BlacklistTokenMocker";

describe('Auth Service Test', ()=> {
    beforeAll(async ()=>{
        await TestSetup.initDb()
    });

    const setUp = ()=>{
        const userRepo = sinon.createStubInstance(UserRepository)
        const tokenBlackListRepo = sinon.createStubInstance(TokenBlackListRepository)
        const authService = new AuthService(userRepo, tokenBlackListRepo);
        return {
            userRepo,
            tokenBlackListRepo,
            authService
        }
    }

    afterEach(()=>{
        sinon.restore();
    })
    
    afterAll(()=>{
        TestSetup.closeDb()
    });

    it('should create new user', async function () {
        const {userRepo, authService} = setUp();
        const user = UserMocker.make();
        const token = TokenMocker.make(user.id);
        userRepo.addUser
            .withArgs(user)
            .resolves(user)
        sinon.stub(TokenService, 'generateToken')
            .withArgs(user.id)
            .returns(token)
        const response = await authService.register(user)
        expect(token).toEqual(response)
    });

    it('should login user', async function () {
        const {userRepo, authService} = setUp();
        const user = UserMocker.make();
        const token = TokenMocker.make(user.id);
        userRepo.find
            .withArgs(user.email)
            .resolves(user)
        sinon.stub(TokenService, 'generateToken')
            .withArgs(user.id)
            .returns(token)
        sinon.stub(bcrypt, 'compareSync').returns(true);
        const response = await authService.login({
            email: user.email,
            password: user.password
        })
        expect(token).toEqual(response)
    });

    it('should fail login user', async function () {
        const {userRepo, authService} = setUp();
        const user = UserMocker.make();
        userRepo.find
            .withArgs('fake@email.com')
            .resolves(user)

        sinon.stub(bcrypt, 'compareSync').returns(false);

        userRepo.find
            .withArgs('fake@email.com')
            .resolves(user)

           await expect(authService.login({
                email: 'fake@email.com',
                password: user.password
            })).rejects.toThrow('Invalid login credentials')
    });

    it('should logout user', async function () {
        const {tokenBlackListRepo, authService} = setUp();
        const user = UserMocker.make();
        const token = TokenMocker.make(user.id);
        const tokenBlackList = BlacklistTokenMocker.make(token)
        tokenBlackListRepo.add
            .withArgs(token)
            .resolves(tokenBlackList)

        const result = await authService.logout(token);
        await expect(token).toEqual(result.token)
    });

    it('should return true if token is blacklisted', async function () {
        const {tokenBlackListRepo, authService} = setUp();
        const user = UserMocker.make();
        const token = TokenMocker.make(user.id);
        const tokenBlackList = BlacklistTokenMocker.make(token)
        tokenBlackListRepo.find
            .withArgs(token)
            .resolves(tokenBlackList)

        const result = await authService.isBlackListed(token);
        await expect(true).toEqual(result)
    });

    it('should return false if token is not blacklisted', async function () {
        const {tokenBlackListRepo, authService} = setUp();
        const user = UserMocker.make();
        const token = TokenMocker.make(user.id);
        tokenBlackListRepo.find
            .withArgs(token)

        const result = await authService.isBlackListed(token);
        await expect(false).toEqual(result)
    });
})