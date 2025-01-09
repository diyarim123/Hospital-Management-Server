const { body, validationResult } = require('express-validator');

const validateDepartment = [
    body('department_name')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Department name is required and must be a string'),
    body('description')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Description must be a positive integer if provided'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateDepartment;
