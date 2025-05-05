const { body, validationResult } = require('express-validator');

const validateRooms = [
    body('room_number')
        .isInt({ min: 1 })
        .withMessage('Room ID must be a positive integer'),
    body('room_type')
        .isString()
        .notEmpty()
        .isIn(['Surgery', 'ICU', 'General'])
        .withMessage('Room Type must be a string'),
    body('capacity')
        .isInt({ min: 1 })
        .withMessage('Capacity must be a positive integer'),
    body('availability_type')
        .isString()
        .notEmpty()
        .withMessage('Availability Type must be a string'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        next();
    }
];


module.exports = validateRooms;
