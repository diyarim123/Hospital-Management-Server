const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const { getRooms, createRoom, deleteRoom, updateRoom } = require(`${__dirname}/../controllers/roomsController`);

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(getRooms)
    .post(createRoom)
router.route('/:id')
    .delete(checkIdExists('rooms', 'room_id'), deleteRoom)
    .put(checkIdExists('rooms', 'room_id'), updateRoom)
    .patch(checkIdExists('rooms', 'room_id'), updateRoom)

// exporting the routes
module.exports = router