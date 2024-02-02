//Registration

const register = async (req,res)=>{
    res.json({
        status: true,
        message: "Registration was successfull",
    });
};




module.exports = {
    register,
};