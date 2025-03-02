require('dotenv').config();

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized. Token is missing.' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
};

const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({error: 'Access denied, Admins only.'})
  }
  next();
}


const patientAuth = (req, res, next) => {
  if (req.user.role !== 'patient' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied, Patients and Admins only.' });
  }
  next();
};


const doctorAuth = (req, res, next) => {
  if (req.user.role !== 'doctor' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied, Doctors and Admins only.' });
  }
  next();
};

module.exports = { authMiddleware, adminAuth, patientAuth, doctorAuth };

