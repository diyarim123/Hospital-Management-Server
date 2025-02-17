const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const { getRoomAssignments, createRoomAssignment, deleteRoomAssignment, updateRoomAssignment } = require(`${__dirname}/../controllers/roomAssignmentsController`);

// importing custom middlewares
const validateRoomAssignment = require('../middlewares/roomAssignmentsValidator');
const { authMiddleware, doctorAuth } = require('../middlewares/authMiddleware');

// import the router
const router = express.Router();

// defining routes
router.param('id', checkIdExists)
router.route('/')
    .get(authMiddleware, doctorAuth, getRoomAssignments)
    .post(authMiddleware, doctorAuth, validateRoomAssignment, createRoomAssignment)
router.route('/:id')
    .delete(authMiddleware, doctorAuth, checkIdExists('room_assignments', 'assignment_id'), deleteRoomAssignment)
    .put(authMiddleware, doctorAuth, checkIdExists('room_assignments', 'assignment_id'), updateRoomAssignment)
    .patch(authMiddleware, doctorAuth, checkIdExists('room_assignments', 'assignment_id'), updateRoomAssignment)

// exporting the routes
module.exports = router