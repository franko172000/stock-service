const { validate, ValidationError, Joi } = require('express-validation')
export const registerValidation = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required(),
        name: Joi.string()
            .required(),
    }),
}