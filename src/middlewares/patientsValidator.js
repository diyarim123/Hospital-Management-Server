const { body, validationResult } = require('express-validator');

const validatePatient = [

    body('first_name')
        .isString()
        .withMessage('First name must be a string')
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters long'),
    body('last_name')
        .isString()
        .withMessage('Last name must be a string')
        .isLength({ min: 2 })
        .withMessage('Last name must be at least 2 characters long'),
    body('gender')
        .isIn(['Male', 'Female'])
        .withMessage('Gender must be one of "male", "female"'),
    body('date_of_birth')
        .isISO8601()
        .withMessage('Date of birth must be a valid date in ISO 8601 format'),
    body('contact_number')
        .isMobilePhone()
        .withMessage('Contact number must be a string')
        .isLength({ min: 11 })
        .withMessage('Contact number must be between 10 and 15 characters'),
    body('address')
        .isString()
        .withMessage('Address must be a string'),
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validatePatient;
