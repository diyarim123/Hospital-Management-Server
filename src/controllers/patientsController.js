const express = require('express')
const app = express();


// import the db configuration
const db = require('../config/dbConfig');

// importing the models
const { getAllPatients, createAPatient, deleteAPatient, updateAPatient} = require('../models/Patients')

// use middleware
app.use(express.json());


const getPatients = async (req, res) => {
    try {
        const patients = await getAllPatients();
        return res.status(200).json({result: patients})
    } catch (err) {
        return res.status(400).json({error: err || "Failed to fetch patients"})
    }
}

const createPatient = async (req, res) => {
    try {
        const { first_name, last_name, date_of_birth, gender, contact_number, address, email } = req.body;

        if (!first_name || !last_name || !date_of_birth || !gender || !contact_number || !address || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        };

        const [patient_id] = await createAPatient(first_name, last_name, date_of_birth, gender, contact_number, address, email);
        res.status(201).json({ data: { patient_id, first_name, last_name, date_of_birth, gender, contact_number, address, email } });
    } catch (err) {
        res.status(500).json({error: err})
    }
}

const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await deleteAPatient(id);

        if(rowsDeleted === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        return res.status(204).json({message: "Data deleted successfuly"});
    } catch (err) {
        return res.status(409).json({error: err})
    }
}

const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if(!Object.keys(updates).length) {
            return res.status(400).json({error: "No fields provided to update !"});
        }

        const rowsUpdated = await updateAPatient(id, updates);

        if(rowsUpdated === 0) {
            return res.status(404).json({error: "No such data found to be updated"});
        }

        return res.status(200).json({data: updates})
    } catch (err) {

    }
}


module.exports = {
    getPatients,
    createPatient,
    deletePatient,
    updatePatient
};


