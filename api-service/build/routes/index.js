"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const AuthController_1 = __importDefault(require("../app/controllers/AuthController"));
const AuthMiddleware_1 = __importDefault(require("../app/Midlleware/AuthMiddleware"));
const StockController_1 = __importDefault(require("../app/controllers/StockController"));
const validations_1 = require("../app/validations");
const { validate } = require('express-validation');
const validateToken = AuthMiddleware_1.default.validateToken.bind(AuthMiddleware_1.default);
//auth routes
router.post('/auth/register', validate(validations_1.registerValidation, { keyByField: true }), AuthController_1.default.register.bind(AuthController_1.default));
router.post('/auth/logout', validateToken, AuthController_1.default.logout.bind(AuthController_1.default));
router.post('/auth/login', AuthController_1.default.login.bind(AuthController_1.default));
router.post('/auth/reset-password', validate(validations_1.passwordReset, { keyByField: true }), AuthController_1.default.resetPassword.bind(AuthController_1.default));
//stock routes
router.get('/stock', validate(validations_1.queryParamValidation, { keyByField: true }), validateToken, StockController_1.default.getStock.bind(StockController_1.default));
router.get('/stock/stats', validateToken, StockController_1.default.aggregate.bind(StockController_1.default));
router.get('/stock/history', validateToken, StockController_1.default.getHistory.bind(StockController_1.default));
exports.default = router;
