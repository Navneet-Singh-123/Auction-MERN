// Import the required Libraries
const express = require('express');
const connectDB = require("./config/db");
const app = express();

// CORS is a node.js package for providing a Connect/Express middleware that 
// can be used to enable CORS with various options.
const cors = require('cors');

// Node.js body parsing middleware.
// Parse incoming request bodies in a middleware before your handlers, 
// available under the req.body property.
const bodyParser = require('body-parser');

// The Path module provides a way of working with directories and file paths.
const path = require('path');

// Connnect Database
connectDB();

// Initializing Middlewares
app.use(express.json({ extended: false }))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


// Define Routes
// If the route begins with /api/users then proceed to routes folder and to user file
// Similarly for other apis as well
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})