const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const {getServices, createService, deleteService, updateService} = require(`${__dirname}/../controllers/servicesController`);

// importing middlewares
const validateServices = require('../middlewares/servicesValidator');
const { authMiddleware, adminAuth } = require('../middlewares/authMiddleware');

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(authMiddleware, adminAuth, getServices)
    .post(authMiddleware, adminAuth, validateServices, createService)
router.route('/:id')
    .delete(authMiddleware, adminAuth, checkIdExists('services', 'service_id'), deleteService)
    .put(authMiddleware, adminAuth, checkIdExists('services', 'service_id'), updateService)
    .patch(authMiddleware, adminAuth, checkIdExists('services', 'service_id'), updateService)

// exporting the routes
module.exports = router