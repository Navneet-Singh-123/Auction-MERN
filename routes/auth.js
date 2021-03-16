// Importing required libraries
const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

// Auth middleware to check if the user is logged in or not
const auth = require("../middlewares/auth");

// Include the functionality of the routes from the the auth controller
const {getUser, login} = require("../controllers/auth")

// Getting the authenticated user
router.get("/", auth, getUser)

// Login the user 
router.post("/", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
], login)

module.exports = router;
