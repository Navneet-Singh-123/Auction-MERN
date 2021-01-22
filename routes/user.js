const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {RegisterUser} = require("../controllers/user")
const User = require("../models/User")

router.post("/", [
    check('name', 'Name is Required').not().isEmpty(), 
    check('email', "Please include a valid Email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min: 6}),
], RegisterUser);

module.exports = router;
