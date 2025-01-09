const express = require('express');
const app = express();

// importing the db source
const db = require('../config/dbConfig');

const getAllDoctors = async () => {
    return await db('doctors')
}

const createADoctor = async (
    first_name,
    last_name,
    specialization,
    gender,
    contact_number,
    department_id
) => {
    return await db('doctors').insert({     
        first_name,
        last_name,
        specialization,
        gender,
        contact_number,
        department_id 
    })
}

const deleteADoctor = async (doctor_id) => {
    return await db('doctors').where({doctor_id}).del();
}

const updateADoctor = async (doctor_id, updates) => {
    return await db('doctors').where({doctor_id}).update(updates)
};



module.exports = {
    getAllDoctors,
    createADoctor,
    deleteADoctor,
    updateADoctor
}