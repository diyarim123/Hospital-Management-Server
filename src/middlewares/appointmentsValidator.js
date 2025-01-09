const { body, validationResult } = require('express-validator');

const validateAppointment = [
    body('patient_id')
        .isInt({ min: 1 })
        .withMessage('Patient ID must be an integer'),
    body('doctor_id')
        .isInt({ min: 1 })
        .withMessage('Doctor ID must be an integer'),
    body('appointment_time')
        .isISO8601({ strict: true })
        .withMessage('Invalid date format'),
    body('status')
        .isIn(['scheduled', 'completed', 'canceled'])
        .withMessage('Invalid status'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateAppointment;
