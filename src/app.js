const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const xssClean = require('xss-clean');
const bodyParser = require('body-parser');
const compression = require('compression');




// import routes
const patientsRouter = require('./routes/patientsRouter')
const doctorsRouter = require('./routes/doctorsRouter')
const staffRouter = require('./routes/staffRouter')
const appointmentsRouter = require('./routes/appointmentsRouter')
const departmentsRouter = require('./routes/departmentsRouter')
const billingsRouter = require('./routes/billingsRouter')
const medicalRecordsRouter = require('./routes/medicalRecordsRouter')
const roomAssignmentsRouter = require('./routes/roomAssignmentsRouter')
const roomsRouter = require('./routes/roomsRouter')
const servicesRouter = require('./routes/servicesRouter')

const db = require(`${__dirname}/config/dbConfig`);

db.raw("SELECT VERSION()").then(() => {
  console.log("Connection Successful");
}).catch(err => {
  console.error("Connection failed: ", err);
});


// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(xssClean());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use("/patients", patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/staff', staffRouter);
app.use('/services', servicesRouter);
app.use('/rooms', roomsRouter);
app.use('/departments', departmentsRouter);
app.use('/medical-records', medicalRecordsRouter);
app.use('/appointments', appointmentsRouter);
app.use('/room-assignments', roomAssignmentsRouter);
app.use('/billings', billingsRouter);

module.exports = app;