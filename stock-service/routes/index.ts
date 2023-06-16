import { Router } from 'express';
const router = Router();
import StockController from "../app/controllers/StockController";
import {queryParamValidation} from "../app/validations";
const { validate} = require('express-validation')

//stock routes
router.get('/internal/stock', validate(queryParamValidation, {keyByField: true}), StockController.getStock.bind(StockController));
export default router;
