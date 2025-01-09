const express = require('express');
const { patch } = require('./billingsRouter');
const app = express()
const checkIdExists = require('../middlewares/checkID')


// importing controllers
const {getDepartments, createDepartment, deleteDepartment, updateDepartment} = require(`${__dirname}/../controllers/departmentsController`);

// importing custom middlewares
const validateDepartments = require('../middlewares/departmentsValidator')

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(getDepartments)
    .post(validateDepartments, createDepartment)

router.route('/:id')
    .delete(checkIdExists('departments', 'department_id'), deleteDepartment)
    .put(checkIdExists('departments', 'department_id'), updateDepartment)
    .patch(checkIdExists('departments', 'department_id'), updateDepartment)

// exporting the routes
module.exports = router