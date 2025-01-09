const express = require('express');
const app = express();

// importing the db source
const db = require('../config/dbConfig');

const getAllRoomAssignments = async () => {
    return await db('room_assignments')
}

const createARoomAssignment = async (
    room_id,
    patient_id,
    doctor_id,
    start_time,
    end_time
) => {
    return await db('room_assignments').insert({     
        room_id,
        patient_id,
        doctor_id,
        start_time,
        end_time
    })
}

const deleteARoomAssignment = async (assignment_id) => {
    return await db('room_assignments').where({assignment_id}).del();
}

const updateARoomAssignment = async (assignment_id, updates) => {
    return await db('room_assignments').where({assignment_id}).update(updates)
};


module.exports = {
    getAllRoomAssignments,
    createARoomAssignment,
    deleteARoomAssignment,
    updateARoomAssignment
}