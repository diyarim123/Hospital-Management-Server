const express = require('express');
const app = express();

// importing the db source
const db = require('../config/dbConfig');

const getAllDepartments = async () => {
    return await db('departments')
}

const createADepartment = async (
    department_name,
    description
) => {
    return await db('departments').insert({     
        department_name,
        description
    })
}

const deleteADepartment = async (department_id) => {
    return await db('departments').where({department_id}).del();
}

const updateADepartment = async (department_id, updates) => {
    return await db('departments').where({department_id}).update(updates)
};


module.exports = {
    getAllDepartments,
    createADepartment,
    deleteADepartment,
    updateADepartment
}