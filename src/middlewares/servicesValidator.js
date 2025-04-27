const { body, validationResult } = require('express-validator');

const validateServices = [

    body('service_name')
        .isString()
        .notEmpty(),
    body('cost')
        .isString()
        .notEmpty()
        .withMessage('cost must be a number'),
    body('description')
        .isString()
        .notEmpty()
        .withMessage('Description must be a string'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }     
        next();
    }
];


module.exports = validateServices;
