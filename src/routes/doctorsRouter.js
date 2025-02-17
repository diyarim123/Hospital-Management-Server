const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const { getDoctors, createDoctor, deleteDoctor, updateDoctor } = require(`${__dirname}/../controllers/doctorsController`);

//importing custom middlewares
const validateBillings = require('../middlewares/doctorsValidator')
const { authMiddleware, patientAuth } = require('../middlewares/authMiddleware');

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(authMiddleware, patientAuth, getDoctors)
    .post(authMiddleware, patientAuth, validateBillings, createDoctor)
router.route("/:id")
    .delete(authMiddleware, patientAuth, checkIdExists('doctors', 'doctor_id'), deleteDoctor)
    .put(authMiddleware, patientAuth, checkIdExists('doctors', 'doctor_id'), updateDoctor)
    .patch(authMiddleware, patientAuth, checkIdExists('doctors', 'doctor_id'), updateDoctor)


// exporting the routes
module.exports = router