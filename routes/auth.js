const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

const {getUser, login} = require("../controllers/auth")


router.get("/", auth, getUser)

router.post("/", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
], login)

module.exports = router;
