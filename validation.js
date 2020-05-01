const Joi = require('@hapi/joi');


const registerValidation = (data) =>{

    const userJoiSchema = Joi.object({
        username:
                Joi.string().alphanum().min(6).max(225).required(),
        email: 
                Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:
                Joi.string().min(8).max(16).required()
    });

    return userJoiSchema.validateAsync(data);
}

module.exports.registerValidation = registerValidation;
