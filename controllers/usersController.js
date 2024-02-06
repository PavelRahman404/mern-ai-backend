const bcrypt = require('bcryptjs')
const User = require("../models/User");

//Registration

const register = async (req,res)=>{
    try {
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
    } catch (error) {
        throw new Error(error);
    }
    
};




module.exports = {
    register,
};