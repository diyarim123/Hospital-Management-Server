require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const knex = require("../config/dbConfig");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER A USER
router.post(
  "/register",
  [
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("role").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role } = req.body;

    const existingUser = await knex("users").where({ email }).first();
    if (existingUser)
      return res.status(400).json({ error: "Email already in use" });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await knex("users").insert({
        username,
        email,
        password: hashedPassword,
        role,
      });
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error registering user", details: err.message });
    }
  }
);

// LOGIN USER
router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await knex("users").where({ email }).first();
      if (!user) return res.status(401).json({ error: "Invalid email" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ error: "Error logging in" });
    }
  }
);

module.exports = router;
