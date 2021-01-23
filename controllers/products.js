const Product = require('../models/Product')
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.CreateProduct =async (req, res) =>{
   const product = new Product({
    name: req.body.name, 
    sellerName: req.body.sellerName, 
    deadline: req.body.deadline, 
    basePrice: req.body.basePrice
   })
   try{
    const savedProduct = await product.save();
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

exports.list = (req, res)=>{
    Product.find()
        .select("-photo")
        .exec((err, products)=>{
            if(err){
                return res.status(400).json({
                    error: 'Products not Found'
                })
            }
            res.json(products);
        })
}

exports.productById = (req, res, next, id)=>{
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

exports.photo = (req, res, next)=>{
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}