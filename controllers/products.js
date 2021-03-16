// Import the product modal 
const Product = require('../models/Product')
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// This function creates a new product and stores it in the database
exports.CreateProduct =async (req, res) =>{
    // Body of the request object contains all the informaion ie req.body
    // So create a new product using the information passed by the user through the form
   const product = new Product({
    name: req.body.name, 
    sellerName: req.body.sellerName, 
    deadline: req.body.deadline, 
    basePrice: req.body.basePrice,
    sellerId: req.body.sellerId
   })
   try{
    // Save the product in the databse
    const savedProduct = await product.save();
    // Return the saved product to front end
    res.json({
        product: savedProduct
    })
   }
   catch(err){
       res.json({
           error: err
       })
   }
} 

// This function return all the products to display in the front end
exports.list = (req, res)=>{
    Product.find()
        .exec((err, products)=>{
            if(err){
                return res.status(400).json({
                    error: 'Products not Found'
                })
            }
            res.json(products);
        })
}

// This  function is used to return an object from the database by its id
exports.productById = (req, res, next, id)=>{
    // Find the product by it if it exist and return
    Product.findById(id)
    .exec((err, product)=>{
        if(err || !product){
            return res.status(400).json({
                error: "Product not found"
            })
        }   
        req.product = product;
        next();
    })
}

// This funtion is used to return the photo of the product which is not 
// yet implemented in the front end due to some errors
exports.photo = (req, res, next)=>{
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

// This product is used to update the bid price of a product
exports.update = async (req, res) => {
    // Get the username and the value placed for bidding by this user
    const {curBidVal, userName} = req.body;
    // Generating a object that stores the current bid value and the buyername
    const productFields = {};
    if(curBidVal){
        productFields.biddingPrice = curBidVal;
    }
    if(userName){
        productFields.buyerName = userName;
    }
    try{
        // Find the product by id whose id is passed in the url
        let product = await Product.findById(req.params.id);
        // If the product is not found return by saying that product not found
        if (!product) 
            return res.status(404).json({ msg: "Product not found" });
        // Other wise update the product bid value
        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: productFields },
            { new: true }
        );
        // Return the product with updated bid value
        res.json(product);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}