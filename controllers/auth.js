const { validationResult } = require("express-validator");

// Getting the user modals
const User = require("../models/User")

// For hashing the password
const bcrypt = require("bcryptjs");

// Getting the global variables
const config = require('config');

// Signing/generating token
const jwt = require("jsonwebtoken");

// Functionality for getting the authenticated user
exports.getUser = async (req, res) => {
    try {
        // Get the user by id from the database excluding the password and return that user
        const user = await User.findById(req.user.id).select("-password"); 
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

// Functionality for signing in the user
exports.login = async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // Get the email and password from the body
    const { email, password } = req.body;
    try {
        // Find the user with this email
        let user = await User.findOne({ email }); 

        // If no such user the return invalid credentials
        if (!user) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }

        // If the user is present then check if the enterred password matches or not
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }

        // If matches then generate a token to tha user using jwt authentication
        const payload = {
          user: {
            id: user.id,
          },
        };

        // Sign the user
        jwt.sign(
          payload,
          config.get("jwtSecret"),{
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
}