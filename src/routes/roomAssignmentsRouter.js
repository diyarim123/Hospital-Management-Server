const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const { getRoomAssignments, createRoomAssignment, deleteRoomAssignment, updateRoomAssignment } = require(`${__dirname}/../controllers/roomAssignmentsController`);

// importing custom middlewares
const validateRoomAssignment = require('../middlewares/roomAssignmentsValidator')

// import the router
const router = express.Router();

// defining routes
router.param('id', checkIdExists)
router.route('/')
    .get(getRoomAssignments)
    .post(validateRoomAssignment, createRoomAssignment)
router.route('/:id')
    .delete(checkIdExists('room_assignments', 'assignment_id'), deleteRoomAssignment)
    .put(checkIdExists('room_assignments', 'assignment_id'), updateRoomAssignment)
    .patch(checkIdExists('room_assignments', 'assignment_id'), updateRoomAssignment)

// exporting the routes
module.exports = router