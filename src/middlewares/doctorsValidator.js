const { body, validationResult } = require('express-validator');

const validateDoctor = [
    body('first_name')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('First name is required and must be a string'),
    body('last_name')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Last name is required and must be a string'),
    body('specialization')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Specialization is required and must be a string'),
    body('gender')
        .isIn(['male', 'female', 'other'])
        .withMessage('Gender must be either "male", "female", or "other"'),
    body('contact_number')
        .isMobilePhone()
        .withMessage('Contact number must be a valid phone number'),
    body('department_id')
        .isInt({ min: 1 })
        .withMessage('Department ID must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateDoctor;
