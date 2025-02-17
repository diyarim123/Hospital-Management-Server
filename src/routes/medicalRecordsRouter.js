const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const { getMedicalRecords, createMedicalRecord, deleteMedicalRecord, updateMedicalRecord } = require(`${__dirname}/../controllers/medicalRecordsController`);

// importing custom middlewares
const validateMedicalRecords = require('../middlewares/medicalRecordsValidator');
const { authMiddleware, doctorAuth } = require('../middlewares/authMiddleware');

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(authMiddleware, doctorAuth, getMedicalRecords)
    .post(authMiddleware, doctorAuth, validateMedicalRecords, createMedicalRecord)
router.route('/:id')
    .delete(authMiddleware, doctorAuth, checkIdExists('medical_records', 'record_id'), deleteMedicalRecord)
    .put(authMiddleware, doctorAuth, checkIdExists('medical_records', 'record_id'), updateMedicalRecord)
    .patch(authMiddleware, doctorAuth, checkIdExists('medical_records', 'record_id'), updateMedicalRecord)

// exporting the routes
module.exports = router