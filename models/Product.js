const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, 
  sellerName: {
      type: String, 
      required: true
  }, 
  deadline: {
      type: Date, 
      required: true
  }, 
  biddingPrice:{
      type: Number,
      default: 0
  }, 
  basePrice: {
    type: Number, 
    required: true
  }, 
  buyerName:{
    type: String, 
    default: ""
  }, 
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }
});

module.exports = mongoose.model("product", ProductSchema);