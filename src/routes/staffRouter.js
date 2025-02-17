const express = require('express');
const app = express();
const checkIdExists = require('../middlewares/checkID')

//importing the controllers
const { getStaff, createStaff, deleteStaff, updateStaff } = require('../controllers/staffController');

// importing custom middlewares
const validateStaff = require('../middlewares/staffValidator')
const { authMiddleware, adminAuth } = require('../middlewares/authMiddleware');

// using the router
const router = express.Router();

// defining routes
router.route("/")
    .get(authMiddleware, adminAuth, getStaff)
    .post(authMiddleware, adminAuth, validateStaff, createStaff)
router.route('/:id')
    .delete(authMiddleware, adminAuth, checkIdExists('staff', 'staff_id'), deleteStaff)
    .put(authMiddleware, adminAuth, checkIdExists('staff', 'staff_id'), updateStaff)
    .patch(authMiddleware, adminAuth, checkIdExists('staff', 'staff_id'), updateStaff)
    
module.exports = router