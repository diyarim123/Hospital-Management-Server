const express = require('express')
const app = express()
const checkIdExists = require('../middlewares/checkID')

// importing controllers
const {getServices, createService, deleteService, updateService} = require(`${__dirname}/../controllers/servicesController`);

// import the router
const router = express.Router();

// defining routes
router.route('/')
    .get(getServices)
    .post(createService)
router.route('/:id')
    .delete(checkIdExists('services', 'service_id'), deleteService)
    .put(checkIdExists('services', 'service_id'), updateService)
    .patch(checkIdExists('services', 'service_id'), updateService)

// exporting the routes
module.exports = router