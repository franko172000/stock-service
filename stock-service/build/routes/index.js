"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const StockController_1 = __importDefault(require("../app/controllers/StockController"));
const validations_1 = require("../app/validations");
const { validate } = require('express-validation');
//stock routes
router.get('/internal/stock', validate(validations_1.queryParamValidation, { keyByField: true }), StockController_1.default.getStock.bind(StockController_1.default));
exports.default = router;
