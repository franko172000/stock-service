"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordReset = exports.queryParamValidation = exports.registerValidation = void 0;
const express_validation_1 = require("express-validation");
exports.registerValidation = {
    body: express_validation_1.Joi.object({
        email: express_validation_1.Joi.string()
            .email()
            .required(),
        password: express_validation_1.Joi.string()
            .required(),
        name: express_validation_1.Joi.string()
            .required(),
    }),
};
exports.queryParamValidation = {
    query: express_validation_1.Joi.object({
        q: express_validation_1.Joi.string()
            .required()
    }),
};
exports.passwordReset = {
    body: express_validation_1.Joi.object({
        email: express_validation_1.Joi.string()
            .email()
            .required()
    }),
};
