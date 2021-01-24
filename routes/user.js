const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const {RegisterUser, UpdateUser} = require("../controllers/user")
const User = require("../models/User")

router.post("/", [
    check('name', 'Name is Required').not().isEmpty(), 
    check('email', "Please include a valid Email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min: 6}),
], RegisterUser);


module.exports = router;
