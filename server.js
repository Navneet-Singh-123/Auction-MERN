const express = require('express');
const connectDB = require("./config/db");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Connnect Database
connectDB();

// Init Middlewares
app.use(express.json({ extended: false }))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


// Define Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})