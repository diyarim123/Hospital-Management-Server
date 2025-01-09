const { body, validationResult } = require('express-validator');

const validateMedicalRecords = [
    body('patient_id')
        .isInt()
        .withMessage('Patient ID must be an integer'),
    body('doctor_id')
        .isInt()
        .withMessage('Doctor ID must be an integer'),
    body('diagnosis')
        .isString()
        .withMessage('Diagnosis must be an integer'),
    body('treatment')
        .isString()
        .withMessage('Treatment must be an integer'),
    body('prescription')
        .isString()
        .withMessage('Prescription must be an integer'),
    body('record_date')
        .isISO8601()
        .withMessage('Invalid date format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateMedicalRecords;
