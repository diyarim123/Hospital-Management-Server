const { body, validationResult } = require('express-validator');

const validateServices = [

    body('service_name')
        .isString()
        .notEmpty()
        .withMessage('Patient ID must be a positive integer'),
    body('cost')
        .isInt({ min: 1 })
        .withMessage('cost must be a positive integer'),
    body('description')
        .isString()
        .notEmpty()
        .withMessage('Description must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        next();
    }
];


module.exports = validateServices;
