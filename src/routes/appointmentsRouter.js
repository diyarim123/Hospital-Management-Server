const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')


// importing controllers
const { getAppointments, createAppointment, deleteAppointment, updateAppointment } = require(`${__dirname}/../controllers/appointmentsController`);

// importing the custom middlewares
const validateAppointment = require('../middlewares/appointmentsValidator')

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(getAppointments)
    .post(validateAppointment, createAppointment)

router.route("/:id")
    .delete(checkIdExists('appointments', 'appointment_id'), deleteAppointment)
    .put(checkIdExists('appointments', 'appointment_id'), updateAppointment)
    .patch(checkIdExists('appointments', 'appointment_id'), updateAppointment)

// exporting the routes
module.exports = router