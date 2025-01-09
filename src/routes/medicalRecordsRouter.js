const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const { getMedicalRecords, createMedicalRecord, deleteMedicalRecord, updateMedicalRecord } = require(`${__dirname}/../controllers/medicalRecordsController`);

// importing custom middlewares
const validateMedicalRecords = require('../middlewares/medicalRecordsValidator')

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(getMedicalRecords)
    .post(validateMedicalRecords, createMedicalRecord)
router.route('/:id')
    .delete(checkIdExists('medical_records', 'record_id'), deleteMedicalRecord)
    .put(checkIdExists('medical_records', 'record_id'), updateMedicalRecord)
    .patch(checkIdExists('medical_records', 'record_id'), updateMedicalRecord)

// exporting the routes
module.exports = router