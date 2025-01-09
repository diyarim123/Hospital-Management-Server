const express = require('express');
const app = express();

// importing the db source
const db = require('../config/dbConfig');

const getAllPatients = async () => {
    return await db('patients')
}

const createAPatient = async (
    first_name,
    last_name,
    date_of_birth,
    gender,
    contact_number,
    address,
    email
) => {
    return await db('patients').insert({     
        first_name,
        last_name,
        date_of_birth,
        gender,
        contact_number,
        address,
        email
    })
}

const deleteAPatient = async (patient_id) => {
    return await db('patients').where({patient_id}).del();
}

const updateAPatient = async (patient_id, updates) => {
    return await db('patients').where({patient_id}).update(updates)
};


module.exports = {
    getAllPatients,
    createAPatient,
    deleteAPatient,
    updateAPatient
}