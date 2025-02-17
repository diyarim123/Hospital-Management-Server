const express = require('express');
const app = express();
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const {getPatients, createPatient, deletePatient, updatePatient} = require(`${__dirname}/../controllers/patientsController`);

// importing custom middlewares
const validatePatients = require('../middlewares/patientsValidator');
const { authMiddleware, doctorAuth } = require('../middlewares/authMiddleware');

//router
const router = express.Router();


// defining routers
router.route('/')
    .get(authMiddleware, doctorAuth, getPatients)
    .post(authMiddleware, doctorAuth, validatePatients, createPatient)
router.route('/:id')
    .delete(authMiddleware, doctorAuth, checkIdExists('patients', 'patient_id'), deletePatient)
    .put(authMiddleware, doctorAuth, checkIdExists('patients', 'patient_id'), updatePatient)
    .patch(authMiddleware, doctorAuth, checkIdExists('patients', 'patient_id'), updatePatient)

module.exports = router;