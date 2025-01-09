const express = require('express');
const app = express();
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const {getPatients, createPatient, deletePatient, updatePatient} = require(`${__dirname}/../controllers/patientsController`);

// importing custom middlewares
const validatePatients = require('../middlewares/patientsValidator')

//router
const router = express.Router();


// defining routers
router.route('/')
    .get(getPatients)
    .post(validatePatients, createPatient)
router.route('/:id')
    .delete(checkIdExists('patients', 'patient_id'), deletePatient)
    .put(checkIdExists('patients', 'patient_id'), updatePatient)
    .patch(checkIdExists('patients', 'patient_id'), updatePatient)

module.exports = router;