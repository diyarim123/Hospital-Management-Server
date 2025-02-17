const express = require('express');
const app = express();

// importing the db source
const db = require('../config/dbConfig');

const getAllBillings = async () => {
    return await db('billing')
    .join('patients', 'billing.patient_id', 'patients.patient_id')
    .join('appointments', 'billing.appointment_id', 'appointments.appointment_id')
    .select(
        'billing.*',
        'patients.first_name as patient_first_name',
        'patients.last_name as patient_last_name',
        'appointments.appointment_time as appointments_appointment_time',
        'appointments.status as appointment_status'
    );
}

const createABilling = async (
    patient_id,
    appointment_id,
    amount,
    payment_status,
    bill_date
) => {
    return await db('billing').insert({     
        patient_id,
        appointment_id,
        amount,
        payment_status,
        bill_date 
    })
}

const deleteABilling = async (bill_id) => {
    return await db('billing').where({bill_id}).del();
}

const updateABilling = async (bill_id, updates) => {
    return await db('billing').where({bill_id}).update(updates)
};


module.exports = {
    getAllBillings,
    createABilling,
    deleteABilling,
    updateABilling
}