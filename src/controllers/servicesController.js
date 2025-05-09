const express = require("express");
const app = express();

// import the db configuration
const db = require("../config/dbConfig");

// importing the models
const {
  getAllServices,
  createAService,
  deleteAService,
  updateAService,
} = require("../models/Services");

// use middleware
app.use(express.json());

const getServices = async (req, res) => {
  try {
    const services = await getAllServices();
    return res.status(200).json({ result: services });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const createService = async (req, res) => {
  try {
    const { service_name, cost, description } = req.body;

    if (!service_name || !cost || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [service_id] = await createAService(service_name, cost, description);
    res
      .status(201)
      .json({ data: { service_id, service_name, cost, description } });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await deleteAService(id);

    if (rowsDeleted === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    return res.status(204).json({ message: "Data deleted successfuly" });
  } catch (err) {
    return res.status(409).json({ error: err });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { service_name, cost, description } = req.body;

    const updates = {
      service_name,
      cost,
      description
    }

    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: "No fields provided to update!" });
    }

    const rowsUpdated = await updateAService(id, updates);

    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ error: "No such data found to be updated" });
    }

    return res.status(200).json({
      data: {
        service_id: Number(id),
        ...updates
      },
    });
  } catch (err) {
    console.error("Error in update Service:", err);
    return res
      .status(500)
      .json({ error: "Something went wrong on the server" });
  }
};

module.exports = {
  getServices,
  createService,
  deleteService,
  updateService,
};
