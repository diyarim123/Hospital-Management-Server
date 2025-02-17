const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const { getBillings, createBilling, deleteBilling, updateBilling} = require(`${__dirname}/../controllers/billingsController`);

// importing custom middlewares
const validateBillings = require('../middlewares/billingsValidator');
const { authMiddleware, adminAuth } = require('../middlewares/authMiddleware');

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(authMiddleware, adminAuth, getBillings)
    .post(authMiddleware, adminAuth, validateBillings, createBilling)

router.route('/:id')
    .delete(authMiddleware, adminAuth, checkIdExists('billing', 'bill_id'), deleteBilling)
    .put(authMiddleware, adminAuth, checkIdExists('billing', 'bill_id'), updateBilling)
    .patch(authMiddleware, adminAuth, checkIdExists('billing', 'bill_id'), updateBilling)


// exporting the routes
module.exports = router