// Importing required libraries
const express = require('express');
const router = express.Router();

// Include the functionality of the product related routes from the product controller
const {CreateProduct, list, photo, productById, update} = require("../controllers/products")

// Creating a product
router.post("/", CreateProduct);

// Getting a list of products
router.get("/", list);

// Getting the photo of the product
router.get("/photo/:productId", photo)

// If the api contains the term productId, then call the function productbyId
// which will then load the current product
router.param('productId', productById)

// Updating the bid value of the product
router.put("/:id", update);

module.exports = router;
