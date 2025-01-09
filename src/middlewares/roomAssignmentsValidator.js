const { body, validationResult } = require('express-validator');

const validateRoomAssignment = [
    body('room_id')
        .isInt({ min: 1 })
        .withMessage('Room ID must be a positive integer'),
    body('patient_id')
        .isInt({ min: 1 })
        .withMessage('Patient ID must be a positive integer'),
    body('start_time')
        .isISO8601({ strict: true })
        .withMessage('Invalid start_time format. Use "YYYY-MM-DD HH:mm:ss"'),
    body('end_time')
        .isISO8601({ strict: true })
        .withMessage('Invalid end_time format. Use "YYYY-MM-DD HH:mm:ss"'),
    body('end_time').custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.start_time)) {
            throw new Error('end_time must be after start_time');
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        next();
    }
];


module.exports = validateRoomAssignment;
