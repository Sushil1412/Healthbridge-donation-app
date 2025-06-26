const Joi = require('joi');

const validateSignup = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required()
            .messages({
                'string.empty': 'Full name is required',
                'string.min': 'Full name should be at least 3 characters long',
                'string.max': 'Full name should not exceed 30 characters'
            }),
        email: Joi.string().email({ tlds: { allow: false } }).required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Please enter a valid email address'
            }),
        password: Joi.string().min(8)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least one uppercase, one lowercase, one number and one special character',
                'string.min': 'Password must be at least 8 characters long'
            }),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
            .messages({
                'any.only': 'Passwords do not match'
            }),
        role: Joi.string().valid('recipient', 'donor').required()
            .messages({
                'any.only': 'Please select either recipient or donor'
            }),
        bloodGroup: Joi.string().valid(
            'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
        ).required()
            .messages({
                'any.only': 'Please select a valid blood group'
            }),
        aadhar: Joi.string().length(12).pattern(/^[0-9]+$/).required()
            .messages({
                'string.length': 'Aadhar must be exactly 12 digits',
                'string.pattern.base': 'Aadhar must contain only numbers'
            })
    }).with('password', 'confirmPassword');

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message.replace(/"/g, '');
            return acc;
        }, {});
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = { validateSignup };