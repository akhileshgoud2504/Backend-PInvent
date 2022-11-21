const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async(req,res) => {
    const { name, email, password } = req.body;

    //validations for mandatory checks
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be up to 6 characters");
    }

    //checking whether user already exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("Email already exists, Please try with another email");
    }

    //Create a new user
    const  user = await User.create({
        name: name,
        email:email,
        password:password
    }) 

    if(user){
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
        });
    } else{
        res.status(400);
        throw new Error("Invalid user data");
    }


    res.send("User registered")
});

module.exports = {
    registerUser,
}