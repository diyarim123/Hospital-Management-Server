const express = require('express')
const app = express();


// import the db configuration
const db = require('../config/dbConfig');

// importing the models
const { getAllBillings, createABilling, deleteABilling, updateABilling } = require('../models/Billings')

// use middleware
app.use(express.json());


const getBillings = async (req, res) => {
    try {
        const billings = await getAllBillings();
        return res.status(200).json({result: billings})
    } catch (err) {
        return res.status(400).json({error: err})
    }
}

const createBilling = async (req, res) => {
    try {
        const { patient_id, appointment_id, amount, payment_status, bill_date } = req.body;

        if (!patient_id || !appointment_id || !amount || !payment_status || !bill_date) {
            return res.status(400).json({ error: 'All fields are required' });
        };

        const [bill_id] = await createABilling(patient_id, appointment_id, amount, payment_status, bill_date);
        res.status(201).json({ message: 'Data added successfully', bill_id });
    } catch (err) {
        res.status(500).json({error: err})
    }
}

const deleteBilling = async (req, res) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await deleteABilling(id);

        if(rowsDeleted === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        return res.status(204).json({message: "Data deleted successfuly"});
    } catch (err) {
        return res.status(409).json({error: err})
    }
}

const updateBilling = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if(!Object.keys(updates).length) {
            return res.status(400).json({error: "No fields provided to update !"});
        }

        const rowsUpdated = await updateABilling(id, updates);

        if(rowsUpdated === 0) {
            return res.status(404).json({error: "No such data found to be updated"});
        }

        return res.status(200).json({message: "Data updated successfully"})
    } catch (err) {

    }
}



module.exports = {
    getBillings,
    createBilling,
    deleteBilling,
    updateBilling
};