const express = require('express');
const router = express.Router();

const {CreateProduct, list, photo, productById, update} = require("../controllers/products")

router.post("/", CreateProduct);
router.get("/", list);
router.get("/photo/:productId", photo)

router.param('productId', productById)

router.put("/:id", update);

module.exports = router;
