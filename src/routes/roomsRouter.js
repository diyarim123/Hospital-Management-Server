const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const { getRooms, createRoom, deleteRoom, updateRoom } = require(`${__dirname}/../controllers/roomsController`);

// importing middlewares
const validateRooms = require('../middlewares/roomsValidator');
const { authMiddleware, adminAuth } = require('../middlewares/authMiddleware');

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(authMiddleware, adminAuth, getRooms)
    .post(authMiddleware, adminAuth, validateRooms, createRoom)
router.route('/:id')
    .delete(authMiddleware, adminAuth, checkIdExists('rooms', 'room_id'), deleteRoom)
    .put(authMiddleware, adminAuth, checkIdExists('rooms', 'room_id'), updateRoom)
    .patch(authMiddleware, adminAuth, checkIdExists('rooms', 'room_id'), updateRoom)

// exporting the routes
module.exports = router