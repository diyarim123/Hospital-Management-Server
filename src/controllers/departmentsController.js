const express = require('express')
const app = express();


// import the db configuration
const db = require('../config/dbConfig');

// importing the models
const { getAllDepartments, createADepartment, deleteADepartment, updateADepartment } = require('../models/Departments')

// use middleware
app.use(express.json());


const getDepartments = async (req, res) => {
    try {
        const departments = await getAllDepartments();
        return res.status(200).json({result: departments})
    } catch (err) {
        return res.status(400).json({error: err})
    }
}

const createDepartment = async (req, res) => {
    try {
        const { department_name, description } = req.body;

        if (!department_name || !description) {
            return res.status(400).json({ error: 'All fields are required' });
        };

        const [department_id] = await createADepartment(department_name, description);
        res.status(201).json({ message: 'Data added successfully', department_id });
    } catch (err) {
        res.status(500).json({error: err})
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await deleteADepartment(id);

        if(rowsDeleted === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        return res.status(204).json({message: "Data deleted successfuly"});
    } catch (err) {
        return res.status(409).json({error: err})
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if(!Object.keys(updates).length) {
            return res.status(400).json({error: "No fields provided to update !"});
        }

        const rowsUpdated = await updateADepartment(id, updates);

        if(rowsUpdated === 0) {
            return res.status(404).json({error: "No such data found to be updated"});
        }

        return res.status(200).json({message: "Data updated successfully"})
    } catch (err) {

    }
}


module.exports = {
    getDepartments,
    createDepartment,
    deleteDepartment,
    updateDepartment
};