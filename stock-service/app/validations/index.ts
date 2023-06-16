const { validate, ValidationError, Joi } = require('express-validation')
export const queryParamValidation = {
    query: Joi.object({
        code: Joi.string()
            .required()
    }),
}