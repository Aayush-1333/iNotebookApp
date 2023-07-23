// ======= Importing modules =======
require('dotenv').config();
const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// ===== Middleware =====
const fetchUser = require('../middleware/fetchUser')

// ======== ROUTE 1: Create a user using POST: /api/auth/createuser ========
router.post(
  "/createuser",
  [
    body("name", "Invalid name").isLength({ min: 3 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Insufficient length!").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // If there are errors return bad request and error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new User document by taking data from the request body
    let user = await Users.findOne({ email: req.body.email });

    try {
      if (user) return res.status(400).json({ error: "Email already exists!" });

      // encryption of password using hashing and then adding extra characters using salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const payload = {
        user: {
          id: user._id,
        }
      };
      const authToken = jwt.sign(payload, 'Notebook90boy');

      return res.status(200).json({ authToken });

    } catch (error) {
      // Errors can be put in logger or SQS
      console.error(error.message);
      res.status(500).send("Internal Server Error!: Create user");
    }
  }
);

// ======= ROUTE 2: Authenticate a user using POST: /api/auth/login ========
router.post(
  "/login",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // if there are errors
    if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() });

    // fetch the user's data using credentials
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email: email });
        if (!user) return res.status(400).json({ error: "Please enter correct credentials" });
        
        // Compare user's hash (converted from given password) against the stored hash   
        const passwdCompare = await bcrypt.compare(password, user.password);
        if (!passwdCompare) return res.status(400).json({ error: "Please enter correct credentials!" })

        // Generate payload in authToken
        const payload = {
            user: {
                id: user._id,
            }
        }

        // Create an authToken - json web token   
        const authToken = jwt.sign(payload, 'Notebook90boy')
        res.status(200).json(authToken) 

        } catch (error) {
            res.status(500).send("Internal Server Error!: Login")
        }
    }
);

// ======== ROUTE 3: Get logged in user's details using POST: /api/auth/userdetails ========
router.post('/userdetails', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await Users.findById(userId).select("-password")
        res.status(200).json(user)

    } catch(error) {
        res.status(500).send("Internal Server Error!: User details")
    }
})

module.exports = router;
