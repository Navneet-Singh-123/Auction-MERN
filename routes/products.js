const express = require('express');
const router = express.Router();

const {CreateProduct, list, photo, productById} = require("../controllers/products")

router.post("/", CreateProduct);
router.get("/", list);
router.get("/photo/:productId", photo)

router.param('productId', productById)

module.exports = router;
