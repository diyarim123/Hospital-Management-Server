const express = require('express');
const app = express();
const checkIdExists = require('../middlewares/checkID')

//importing the controllers
const { getStaff, createStaff, deleteStaff, updateStaff } = require('../controllers/staffController');

// importing custom middlewares
const validateStaff = require('../middlewares/staffValidator')

// using the router
const router = express.Router();

// defining routes
router.route("/")
    .get(getStaff)
    .post(validateStaff, createStaff)
router.route('/:id')
    .delete(checkIdExists('staff', 'staff_id'), deleteStaff)
    .put(checkIdExists('staff', 'staff_id'), updateStaff)
    .patch(checkIdExists('staff', 'staff_id'), updateStaff)
    
module.exports = router