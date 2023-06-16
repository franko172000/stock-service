import { Router } from 'express';
const router = Router();
import AuthController from "../app/controllers/AuthController";
import AuthMiddleware from "../app/Midlleware/AuthMiddleware";
import StockController from "../app/controllers/StockController";
import {queryParamValidation, registerValidation} from "../app/validations";
const { validate} = require('express-validation')
const validateToken = AuthMiddleware.validateToken.bind(AuthMiddleware)

//auth routes
router.post('/auth/register', validate(registerValidation, {keyByField: true}), AuthController.register.bind(AuthController));
router.post('/auth/logout', validateToken, AuthController.logout.bind(AuthController));
router.post('/auth/login', AuthController.login.bind(AuthController));

//stock routes
router.get('/stock', validate(queryParamValidation, {keyByField: true}), validateToken, StockController.getStock.bind(StockController));
router.get('/stock/stats',validateToken, StockController.aggregate.bind(StockController));
router.get('/stock/history', validateToken, StockController.getHistory.bind(StockController));
export default router;
