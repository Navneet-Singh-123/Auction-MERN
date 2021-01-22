const express = require('express');
const connectDB = require("./config/db");
const app = express();

// Connnect Database
connectDB();

// Init Middlewares
app.use(express.json({ extended: false }))

// Define Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})