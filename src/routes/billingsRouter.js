const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const { getBillings, createBilling, deleteBilling, updateBilling} = require(`${__dirname}/../controllers/billingsController`);

// importing custom middlewares
const validateBillings = require('../middlewares/billingsValidator');

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(getBillings)
    .post(validateBillings, createBilling)

router.route('/:id')
    .delete(checkIdExists('billing', 'bill_id'), deleteBilling)
    .put(checkIdExists('billing', 'bill_id'), updateBilling)
    .patch(checkIdExists('billing', 'bill_id'), updateBilling)


// exporting the routes
module.exports = router