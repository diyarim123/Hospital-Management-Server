const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')


// importing controllers
const { getAppointments, createAppointment, deleteAppointment, updateAppointment } = require(`${__dirname}/../controllers/appointmentsController`);

// importing the custom middlewares
const validateAppointment = require('../middlewares/appointmentsValidator');
const { authMiddleware, doctorAuth } = require('../middlewares/authMiddleware');

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(authMiddleware, doctorAuth, getAppointments)
    .post(authMiddleware, doctorAuth, validateAppointment, createAppointment)

router.route("/:id")
    .delete(authMiddleware, doctorAuth, checkIdExists('appointments', 'appointment_id'), deleteAppointment)
    .put(authMiddleware, doctorAuth, checkIdExists('appointments', 'appointment_id'), updateAppointment)
    .patch(authMiddleware, doctorAuth, checkIdExists('appointments', 'appointment_id'), updateAppointment)


module.exports = router