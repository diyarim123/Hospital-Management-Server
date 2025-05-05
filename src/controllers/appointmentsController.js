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
      const {
        patient_id,
        doctor_id,
        appointment_time,
        status,
        patient_first_name,
        patient_last_name,
        doctor_first_name,
        doctor_last_name,
      } = req.body;
  
      if (
        !patient_id ||
        !doctor_id ||
        !appointment_time ||
        !status ||
        !patient_first_name ||
        !patient_last_name ||
        !doctor_first_name ||
        !doctor_last_name
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }
      
  
      const [appointment_id] = await createAnAppointment(
        patient_id,
        doctor_id,
        appointment_time,
        status,
      );
      res.status(201).json({
        data: {
          appointment_id,
          patient_id,
          doctor_id,
          appointment_time,
          status,
          patient_first_name,
          patient_last_name,
          doctor_first_name,
          doctor_last_name,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

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
      const {
        patient_id,
        doctor_id,
        appointment_time,
        status,
        patient_first_name,
        patient_last_name,
        doctor_first_name,
        doctor_last_name,
      } = req.body;
  
      const updates = {
        patient_id,
        doctor_id,
        appointment_time,
        status,
      };
  
      if (!Object.keys(updates).length) {
        return res.status(400).json({ error: "No fields provided to update!" });
      }
  
      const rowsUpdated = await updateAnAppointment(id, updates);
  
      if (rowsUpdated === 0) {
        return res
          .status(404)
          .json({ error: "No such data found to be updated" });
      }
  
      return res.status(200).json({
          data: {
            appointment_id: Number(id),
            ...updates,
            patient_first_name,
            patient_last_name,
            doctor_first_name,
            doctor_last_name,
          },
      });      
    } catch (err) {
      console.error("Error in update record:", err);
      return res
        .status(500)
        .json({ error: "Something went wrong on the server" });
    }
  };



module.exports = {
    getAppointments,
    createAppointment,
    deleteAppointment,
    updateAppointment
};