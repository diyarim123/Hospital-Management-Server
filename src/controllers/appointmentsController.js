const express = require('express')
const app = express();


// import the db configuration
const db = require('../config/dbConfig');

// importing the models
const { getAllAppointments, createAnAppointment, deleteAnAppointment, updateAnAppointment} = require('../models/Appointments')


// use middleware
app.use(express.json());


const getAppointments = async (req, res) => {
    try {
        const appointments = await getAllAppointments();
        return res.status(200).json({result: appointments})
    } catch (err) {
        return res.status(400).json({error: err})
    }
}


const createAppointment = async (req, res) => {
    try {
        const { patient_id, doctor_id, appointment_time, status } = req.body;

        if (!patient_id || !doctor_id || !appointment_time || !status) {
            return res.status(400).json({ error: 'All fields are required' });
        };

        const [appointment_id] = await createAnAppointment(patient_id, doctor_id, appointment_time, status);
        res.status(201).json({ message: 'Data added successfully', appointment_id });
    } catch (err) {
        res.status(500).json({error: err})
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await deleteAnAppointment(id);

        if(rowsDeleted === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        return res.status(204).json({message: "Data deleted successfuly"});
    } catch (err) {
        return res.status(409).json({error: err})
    }
}

const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if(!Object.keys(updates).length) {
            return res.status(400).json({error: "No fields provided to update !"});
        }

        const rowsUpdated = await updateAnAppointment(id, updates);

        if(rowsUpdated === 0) {
            return res.status(404).json({error: "No such data found to be updated"});
        }

        return res.status(200).json({message: "Data updated successfully"})
    } catch (err) {

    }
}



module.exports = {
    getAppointments,
    createAppointment,
    deleteAppointment,
    updateAppointment
};