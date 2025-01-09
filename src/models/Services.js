const express = require('express');
const app = express();

// importing the db source
const db = require('../config/dbConfig');

const getAllServices = async () => {
    return await db('services')
}

const createAService = async (
    service_name,
    cost,
    description
) => {
    return await db('services').insert({     
        service_name,
        cost,
        description
    })
}

const deleteAService = async (service_id) => {
    return await db('services').where({service_id}).del();
}

const updateAService = async (service_id, updates) => {
    return await db('services').where({service_id}).update(updates)
};


module.exports = {
    getAllServices,
    createAService,
    deleteAService,
    updateAService
}