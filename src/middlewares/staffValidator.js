const { body, validationResult } = require('express-validator');

const validateStaff = [

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
    body('role')
        .isIn(['Nurse', 'Receptionist', 'Technician', 'Admin', 'Support'])
        .withMessage('Role must be one of "nurse", "receptionist", "technician", "admin", or "support"'),
    body('gender')
        .isIn(['Male', 'Female'])
        .withMessage('Gender must be one of "male", "female"'),
    body('contact_number')
        .isString()
        .withMessage('Contact number must be a string')
        .isLength({ min: 10, max: 15 })
        .withMessage('Contact number must be between 10 and 15 characters'),
    body('department_id')
        .isInt()
        .withMessage('Department ID must be an integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateStaff;
