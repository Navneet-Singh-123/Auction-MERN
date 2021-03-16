// Importing required libraries
const express = require('express');
const router = express.Router();

// To valdate the user information
const { check } = require("express-validator");

// Include the functionality of the registration related route from the user controller
const {RegisterUser, UpdateUser} = require("../controllers/user")

// Importing the user model 
const User = require("../models/User")

// Registering a new user
router.post("/", [
    check('name', 'Name is Required').not().isEmpty(), 
    check('email', "Please include a valid Email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min: 6}),
], RegisterUser);


module.exports = router;
