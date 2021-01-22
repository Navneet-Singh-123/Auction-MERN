const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Define Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/product', require('./routes/products'));

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})