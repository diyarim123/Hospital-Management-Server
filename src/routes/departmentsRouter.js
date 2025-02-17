const express = require('express');
const { patch } = require('./billingsRouter');
const app = express()
const checkIdExists = require('../middlewares/checkID')


// importing controllers
const {getDepartments, createDepartment, deleteDepartment, updateDepartment} = require(`${__dirname}/../controllers/departmentsController`);

// importing custom middlewares
const validateDepartments = require('../middlewares/departmentsValidator');
const { authMiddleware, adminAuth } = require('../middlewares/authMiddleware');

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(authMiddleware, adminAuth, getDepartments)
    .post(authMiddleware, adminAuth, validateDepartments, createDepartment)

router.route('/:id')
    .delete(authMiddleware, adminAuth, checkIdExists('departments', 'department_id'), deleteDepartment)
    .put(authMiddleware, adminAuth, checkIdExists('departments', 'department_id'), updateDepartment)
    .patch(authMiddleware, adminAuth, checkIdExists('departments', 'department_id'), updateDepartment)

// exporting the routes
module.exports = router