import { validate, ValidationError, Joi } from 'express-validation'
export const queryParamValidation = {
    query: Joi.object({
        code: Joi.string()
            .required()
    }),
}