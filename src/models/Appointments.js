const express = require('express');
const app = express();

// importing the db source
const db = require('../config/dbConfig');

const getAllAppointments = async () => {
    return await db('appointments')
}

const createAnAppointment = async (
    patient_id,
    doctor_id,
    appointment_time,
    status
) => {
    return await db('appointments').insert({     
        patient_id,
        doctor_id,
        appointment_time,
        status 
    })
}

const deleteAnAppointment = async (appointment_id) => {
    return await db('appointments').where({appointment_id}).del();
}

const updateAnAppointment = async (appointment_id, updates) => {
    return await db('appointments').where({appointment_id}).update(updates)
};


module.exports = {
    getAllAppointments,
    createAnAppointment,
    deleteAnAppointment,
    updateAnAppointment
}