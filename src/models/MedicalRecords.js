const express = require('express');
const app = express();

// importing the db source
const db = require('../config/dbConfig');

const getAllMedicalRecords = async () => {
    return await db('medical_records')
    .join('patients', 'medical_records.patient_id', 'patients.patient_id')
    .join('doctors', 'medical_records.doctor_id', 'doctors.doctor_id')
    .select(
        'medical_records.*',
        'patients.first_name as patient_first_name',
        'patients.last_name as patient_last_name',
        'doctors.first_name as doctor_first_name',
        'doctors.last_name as doctor_last_name'
    );
}

const createAMedicalRecord = async (
    patient_id,
    doctor_id,
    diagnosis,
    treatment,
    prescription,
    record_date
) => {
    return await db('medical_records').insert({     
        patient_id,
        doctor_id,
        diagnosis,
        treatment,
        prescription,
        record_date
    })
}

const deleteAMedicalRecord = async (record_id) => {
    return await db('medical_records').where({record_id}).del();
}

const updateAMedicalRecord = async (record_id, updates) => {
    return await db('medical_records').where({record_id}).update(updates)
};


module.exports = {
    getAllMedicalRecords,
    createAMedicalRecord,
    deleteAMedicalRecord,
    updateAMedicalRecord
}