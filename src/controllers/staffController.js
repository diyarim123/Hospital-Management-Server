const express = require("express");
const app = express();

// import the db configuration
const db = require("../config/dbConfig");

// importing the models for this controller
const {
  getAllStaff,
  createAStaff,
  deleteAStaff,
  updateAStaff,
} = require("../models/Staff");

// use middleware
app.use(express.json());

const getStaff = async (req, res) => {
  try {
    const staff = await getAllStaff();
    return res.status(200).json({ result: staff });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const createStaff = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      role,
      gender,
      contact_number,
      department_id,
      department_name,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !role ||
      !gender ||
      !contact_number ||
      !department_id
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [staff_id] = await createAStaff(
      first_name,
      last_name,
      role,
      gender,
      contact_number,
      department_id
    );
    res.status(201).json({
      data: {
        staff_id,
        first_name,
        last_name,
        role,
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

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await deleteAStaff(id);

    if (rowsDeleted === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    return res.status(204).json({ message: "Data deleted successfuly" });
  } catch (err) {
    return res.status(409).json({ error: err });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      role,
      gender,
      contact_number,
      department_id,
      department_name,
    } = req.body;

    const updates = {
      first_name,
      last_name,
      role,
      gender,
      contact_number,
      department_id,
    };

    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: "No fields provided to update!" });
    }

    const rowsUpdated = await updateAStaff(id, updates);

    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ error: "No such data found to be updated" });
    }

    return res.status(200).json({
      data: {
        staff_id: Number(id), // Ensure it's returned and as a number
        ...updates,
        department_name, // Also include this if your frontend uses it
      },
    });
  } catch (err) {
    console.error("Error in update Staff:", err);
    return res
      .status(500)
      .json({ error: "Something went wrong on the server" });
  }
};

module.exports = {
  getStaff,
  createStaff,
  deleteStaff,
  updateStaff,
};
