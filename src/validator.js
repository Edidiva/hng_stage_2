// validator.js

const Joi = require('joi');

const createPersonValidator = Joi.object({
    name: Joi.string().required().messages({ message: 'Your name is not in the valid format' }),
}).strict();

module.exports = {
    createPersonValidator
};
