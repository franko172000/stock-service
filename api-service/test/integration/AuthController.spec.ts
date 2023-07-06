import app from '../../app'
import request from 'supertest'
import Chance from "chance";
import TestSetup from "../TestSetup";
import {UserMocker} from "../mockers/UserMocker";
import TokenBlacklist from "../../database/model/TokenBlacklist";
import TokenService from "../../app/services/TokenService";

const ch = new Chance();
describe('Auth Controller Test', ()=>{
    const basePath = '/api/auth/';
    //const app = require('../../app')
    beforeAll(async ()=>{
        //await connection.sync();
       await TestSetup.initDb()
    });

    afterAll(async ()=>{
        //await connection.close();
        await TestSetup.closeDb()
    });

    it('Should register user and return a token', async ()=>{
        const response = await request(app).post(`${basePath}register`)
            .send({
                email: 'test123@gmail.com',
                name: 'Test',
                password: 'test'
            });

        expect(response.status).toEqual(201)
        expect(typeof response.body.token).toEqual('string')
    })

    it('Should login user and return a token', async ()=>{
        const user = await UserMocker.make({
            password: 'test'
        }).save()
        const response = await request(app).post(`${basePath}login`)
            .send({
                email: user.email,
                password: 'test'
            });

        expect(response.status).toEqual(200)
        expect(typeof response.body.token).toEqual('string')
    })

    it('Should logout user and blacklist token', async ()=>{
        const user = await UserMocker.make({
            password: 'test'
        }).save()
        const token = TokenService.generateToken(user.id)
        const response = await request(app).post(`${basePath}logout`)
            .set('Authorization', 'Bearer ' + token)

        const blackListToken = await TokenBlacklist.findOne({
            where: {
                token
            }
        })

        expect(response.status).toEqual(200)
        expect(blackListToken?.token).toEqual(token)
    })
})