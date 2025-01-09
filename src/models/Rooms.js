const express = require('express');
const app = express();

// importing the db source
const db = require('../config/dbConfig');

const getAllRooms = async () => {
    return await db('rooms')
}

const createARoom= async (
    room_number,
    room_type,
    capacity,
    availability_type
) => {
    return await db('rooms').insert({     
        room_number,
        room_type,
        capacity,
        availability_type
    })
}

const deleteARoom = async (room_id) => {
    return await db('rooms').where({room_id}).del();
}

const updateARoom = async (room_id, updates) => {
    return await db('rooms').where({room_id}).update(updates)
};


module.exports = {
    getAllRooms,
    createARoom,
    deleteARoom,
    updateARoom
}