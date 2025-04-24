const express = require("express");
const app = express();

// import the db configuration
const db = require("../config/dbConfig");

// importing the models
const {
  getAllDoctors,
  createADoctor,
  deleteADoctor,
  updateADoctor,
} = require("../models/Doctors");

// use middleware
app.use(express.json());

const getDoctors = async (req, res) => {
  try {
    const doctors = await getAllDoctors();
    return res.status(200).json({ result: doctors });
  } catch (err) {
    return res.status(400).json({ error: err || "Failed to fetch doctors" });
  }
};

const createDoctor = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      specialization,
      gender,
      contact_number,
      department_id,
      department_name,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !specialization ||
      !gender ||
      !contact_number ||
      !department_id
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [doctor_id] = await createADoctor(
      first_name,
      last_name,
      specialization,
      gender,
      contact_number,
      department_id
    );
    res.status(201).json({
      data: {
        doctor_id,
        first_name,
        last_name,
        specialization,
        gender,
        contact_number,
        department_id,
        department_name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await deleteADoctor(id);

    if (rowsDeleted === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    return res.status(204).json({ message: "Data deleted successfuly" });
  } catch (err) {
    return res.status(409).json({ error: err });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      specialization,
      gender,
      contact_number,
      department_id,
      department_name,
    } = req.body;

    const updates = {
      first_name,
      last_name,
      specialization,
      gender,
      contact_number,
      department_id,
    };

    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: "No fields provided to update!" });
    }

    const rowsUpdated = await updateADoctor(id, updates);

    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ error: "No such data found to be updated" });
    }

    return res.status(200).json({
      data: {
        doctor_id: Number(id), // Ensure it's returned and as a number
        ...updates,
        department_name, // Also include this if your frontend uses it
      },
    });
  } catch (err) {
    console.error("Error in updateDoctor:", err);
    return res
      .status(500)
      .json({ error: "Something went wrong on the server" });
  }
};

module.exports = { getDoctors, createDoctor, deleteDoctor, updateDoctor };
