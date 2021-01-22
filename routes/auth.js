const express = require('express');
const router = express.Router();

const {getUser, login} = require("../controllers/auth")


router.get("/", getUser)
router.post("/", login)

module.exports = router;
