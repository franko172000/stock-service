"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParamValidation = void 0;
const express_validation_1 = require("express-validation");
exports.queryParamValidation = {
    query: express_validation_1.Joi.object({
        code: express_validation_1.Joi.string()
            .required()
    }),
};
