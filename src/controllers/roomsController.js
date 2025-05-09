const express = require('express')
const app = express();


// import the db configuration
const db = require('../config/dbConfig');

// importing the models
const { getAllRooms, createARoom, deleteARoom, updateARoom } = require('../models/Rooms')

// use middleware
app.use(express.json());


const getRooms = async (req, res) => {
    try {
        const rooms = await getAllRooms();
        return res.status(200).json({result: rooms})
    } catch (err) {
        return res.status(400).json({error: err})
    }
}

const createRoom = async (req, res) => {
    try {
      const {
        room_number,
        room_type,
        capacity,
        availability_type
      } = req.body;
  
      if (
        !room_number ||
        !room_type ||
        !capacity ||
        !availability_type
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const [room_id] = await createARoom(
        room_number,
        room_type,
        capacity,
        availability_type
      );
      res.status(201).json({
        data: {
          room_id,
          room_number,
          room_type,
          capacity,
          availability_type
        },
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await deleteARoom(id);

        if(rowsDeleted === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        return res.status(204).json({message: "Data deleted successfuly"});
    } catch (err) {
        return res.status(409).json({error: err})
    }
}

const updateRoom = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        room_number,
        room_type,
        capacity,
        availability_type
      } = req.body;
  
      const updates = {
        room_number,
        room_type,
        capacity,
        availability_type
      };
  
      if (!Object.keys(updates).length) {
        return res.status(400).json({ error: "No fields provided to update!" });
      }
  
      const rowsUpdated = await updateARoom(id, updates);
  
      if (rowsUpdated === 0) {
        return res
          .status(404)
          .json({ error: "No such data found to be updated" });
      }
  
      return res.status(200).json({
        data: {
          room_id: Number(id), // Ensure it's returned and as a number
          ...updates
        },
      });
    } catch (err) {
      console.error("Error in update Room:", err);
      return res
        .status(500)
        .json({ error: "Something went wrong on the server" });
    }
  };


module.exports = {
    getRooms,
    createRoom,
    deleteRoom,
    updateRoom
};