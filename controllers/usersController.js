const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const User = require("../models/User");

//Registration

const register = asyncHandler(async (req,res)=>{
    
        const {username,email,password}= req.body
        //validate
        if(!username || !email || !password){
            res.status(400)
            throw new Error('Please fill all fields')
        }
        //Check the email
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400)
            throw new Error('User already exists')
        }
        // password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        //create the user
        const newUser = new User({
            username,
            password:hashedPassword,
            email,
        });
        //trial expiration date
        newUser.trialExpires = new Date(
            new Date().getTime()+ newUser.trialPeriod * 24 * 60 * 60 * 1000
        )
        //save the user
        await newUser.save();

        res.json({
            status: true,
            message: "Registration was successfull",
            user:{
                username,
                email,
            },
        });
     
});

//login

const login = asyncHandler(async(req,res)=>{
    const {email,password}= req.body
    const user = await User.findOne({email})
    if(!user){
        res.status(401)
        throw new Error('Invalid email or password')

    }
    // password validation
    const isMatch = await bcrypt.compare(password,user?.password)
    if(!isMatch){
        res.status(401);
        throw new Error("Invalid email or password");
    }
    //generate jwt token
    const token = jwt.sign({id: user?._id},process.env.JWT_SECRET,{
        expiresIn : '30d'
    })
    console.log(token)
    //set the token into cookie
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 24 * 60 * 60 * 1000,
    });
    //send the response
    res.json({
    _id:user?._id,
    status:'success',
    message:'Login success',
    username:user?.username
});

});


module.exports = {
    register,
    login,
};