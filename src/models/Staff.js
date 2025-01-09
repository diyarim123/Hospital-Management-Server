const express = require('express');
const app = express();

// importing the db source
const db = require('../config/dbConfig');

const getAllStaff = async () => {
    return await db('staff')
}

const createAStaff = async (
    first_name,
    last_name,
    role,
    gender,
    contact_number,
    department_id
) => {
    return await db('staff').insert({     
        first_name,
        last_name,
        role,
        gender,
        contact_number,
        department_id
    })
}

const deleteAStaff = async (staff_id) => {
    return await db('staff').where({staff_id}).del();
}

const updateAStaff = async (staff_id, updates) => {
    return await db('staff').where({staff_id}).update(updates)
};

module.exports = {
    getAllStaff,
    createAStaff,
    deleteAStaff,
    updateAStaff
}