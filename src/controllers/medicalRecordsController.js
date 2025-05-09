const express = require("express");
const app = express();

// import the db configuration
const db = require("../config/dbConfig");

// importing the models
const {
  getAllMedicalRecords,
  createAMedicalRecord,
  deleteAMedicalRecord,
  updateAMedicalRecord,
} = require("../models/MedicalRecords");

// use middleware
app.use(express.json());

const getMedicalRecords = async (req, res) => {
  try {
    const medical_records = await getAllMedicalRecords();
    return res.status(200).json({ result: medical_records });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const createMedicalRecord = async (req, res) => {
  try {
    const {
      patient_id,
      doctor_id,
      diagnosis,
      treatment,
      prescription,
      record_date,
      patient_first_name,
      patient_last_name,
      doctor_first_name,
      doctor_last_name,
    } = req.body;

    if (
      !patient_id ||
      !doctor_id ||
      !diagnosis ||
      !treatment ||
      !prescription ||
      !record_date ||
      !patient_first_name ||
      !patient_last_name ||
      !doctor_first_name ||
      !doctor_last_name
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    

    const [record_id] = await createAMedicalRecord(
      patient_id,
      doctor_id,
      diagnosis,
      treatment,
      prescription,
      record_date
    );
    res.status(201).json({
      data: {
        record_id,
        patient_id,
        doctor_id,
        diagnosis,
        treatment,
        prescription,
        record_date,
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

const deleteMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await deleteAMedicalRecord(id);

    if (rowsDeleted === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    return res.status(204).json({ message: "Data deleted successfuly" });
  } catch (err) {
    return res.status(409).json({ error: err });
  }
};

const updateMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      patient_id,
      doctor_id,
      diagnosis,
      treatment,
      prescription,
      record_date,
      patient_first_name,
      patient_last_name,
      doctor_first_name,
      doctor_last_name,
    } = req.body;

    const updates = {
      patient_id,
      doctor_id,
      diagnosis,
      treatment,
      prescription,
      record_date,
    };

    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: "No fields provided to update!" });
    }

    const rowsUpdated = await updateAMedicalRecord(id, updates);

    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ error: "No such data found to be updated" });
    }

    return res.status(200).json({
        data: {
          record_id: Number(id),
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
  getMedicalRecords,
  createMedicalRecord,
  deleteMedicalRecord,
  updateMedicalRecord,
};


