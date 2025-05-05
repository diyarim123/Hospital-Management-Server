const { body, validationResult } = require('express-validator');

const validateBillings = [
    body('patient_id')
        .isInt({ min: 1 })
        .withMessage('Patient ID must be an integer'),
    body('amount')
        .isString()
        .withMessage('Amount must be an integer'),
    body('payment_status')
        .isIn(['Paid', 'Not Paid', 'Insurance'])
        .withMessage('Invalid status'),
    body('bill_date')
        .isISO8601({ strict: true })
        .withMessage('Invalid date format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateBillings;


