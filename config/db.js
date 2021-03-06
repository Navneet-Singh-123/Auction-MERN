// Acquiring Essentials Modules
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//Connecting to the Database:
const connectDB = async () => {
    // Connect the mongodb database to the project
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch (err) {
      console.log(err.message);
      process.exit(1); // Exit with failure
    }
  };
  
  module.exports = connectDB;
