// Importing the required libraries
// This is to check the input fields and put validation on it
const { validationResult } = require("express-validator");

// Import the user modal
const User = require("../models/User")

// This is to hash the user password
const bcrypt = require("bcryptjs");

// To obtain the global variables
const config = require('config');

// To provide the token to the user 
const jwt = require("jsonwebtoken");

// This function is the create a new user and provide token to it
exports.RegisterUser = async (req, res)=>{
    // In case of errors return with status code of 401 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // If no errors then get ther user information from the body of the request object
    // Passed through the form in the front wend
    const { name, email, password } = req.body;
    try{
        // Find the user with this email
        let user = await User.findOne({ email });
        if (user) {
            // If the user with this email is found then no point registering again so just return and let front end handle
            res.status(400).json({ msg: "User already exists" });
        }
        // Otherwise create a new user object based on the User modal
        user = new User({
            name,
            email,
            password,
        });
        // Generate a salt to hash the password
        const salt = await bcrypt.genSalt(10);
        // Hash the password using bcrypt
        user.password = await bcrypt.hash(password, salt);
        // Saved the newly created user
        await user.save();
        // New provide him/her the token using jsonwebtoken 
        const payload = {
            user: {
              id: user.id,
            },
        };    
        // sign the token 
        jwt.sign( payload, config.get("jwtSecret"),{
              expiresIn: 360000,
        },(err, token) => {
            if (err){
                throw err;
            }
            res.json({ token });
            }
        );
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("Server Error");
    }
}
