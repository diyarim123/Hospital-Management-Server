const express = require('express');
const app = express();

// importing the db source
const db = require('../config/dbConfig');

const getAllRoomAssignments = async () => {
    return await db('room_assignments')
    .join('rooms', 'room_assignments.room_id', 'rooms.room_id')
    .join('patients', 'room_assignments.patient_id', 'patients.patient_id')
    .join('doctors', 'room_assignments.doctor_id', 'doctors.doctor_id')
    .select(
        'room_assignments.*',
        'rooms.room_number as room_number',
        'patients.first_name as patient_first_name',
        'patients.last_name as patient_last_name',
        'doctors.first_name as doctor_first_name',
        'doctors.last_name as doctor_last_name'
    );
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