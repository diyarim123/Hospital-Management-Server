const express = require('express')
const app = express();


// import the db configuration
const db = require('../config/dbConfig');

// importing the models
const { getAllRoomAssignments, createARoomAssignment, deleteARoomAssignment, updateARoomAssignment } = require('../models/RoomAssignments')

// use middleware
app.use(express.json());


const getRoomAssignments = async (req, res) => {
    try {
        const room_assignments = await getAllRoomAssignments();
        return res.status(200).json({result: room_assignments})
    } catch (err) {
        return res.status(400).json({error: err})
    }
}

const createRoomAssignment = async (req, res) => {
    try {
        const { room_id, patient_id, doctor_id, start_time, end_time} = req.body;

        if (!room_id || !patient_id || !doctor_id || !start_time || !end_time) {
            return res.status(400).json({ error: 'All fields are required' });
        };

        const [assignment_id] = await createARoomAssignment(room_id, patient_id, doctor_id, start_time, end_time);
        res.status(201).json({ message: 'Data added successfully', assignment_id });
    } catch (err) {
        res.status(500).json({error: err})
    }
}

const deleteRoomAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await deleteARoomAssignment(id);

        if(rowsDeleted === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        return res.status(204).json({message: "Data deleted successfuly"});
    } catch (err) {
        return res.status(409).json({error: err})
    }
}

const updateRoomAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if(!Object.keys(updates).length) {
            return res.status(400).json({error: "No fields provided to update !"});
        }

        const rowsUpdated = await updateARoomAssignment(id, updates);

        if(rowsUpdated === 0) {
            return res.status(404).json({error: "No such data found to be updated"});
        }

        return res.status(200).json({message: "Data updated successfully"})
    } catch (err) {

    }
}


module.exports = {
    getRoomAssignments,
    createRoomAssignment,
    deleteRoomAssignment,
    updateRoomAssignment
};