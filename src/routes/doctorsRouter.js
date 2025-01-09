const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const { getDoctors, createDoctor, deleteDoctor, updateDoctor } = require(`${__dirname}/../controllers/doctorsController`);

//importing custom middlewares
const validateBillings = require('../middlewares/doctorsValidator')

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(getDoctors)
    .post(validateBillings, createDoctor)
router.route("/:id")
    .delete(checkIdExists('doctors', 'doctor_id'), deleteDoctor)
    .put(checkIdExists('doctors', 'doctor_id'), updateDoctor)
    .patch(checkIdExists('doctors', 'doctor_id'), updateDoctor)


// exporting the routes
module.exports = router