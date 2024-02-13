const axios = require("axios");
const asyncHandler = require("express-async-handler");

const openAIController = asyncHandler (async(req,res)=>{
    const {prompt} = req.body
    try {
       const response = await axios.post('https://api.openai.com/v1/chat/completions',{
            model:'gpt-3.5-turbo',
            prompt,
            max_tokens:10
        },{
            headers:{
                Authorizaton: `Bearer ${process.env.OPENAI_AI_KEY}`,
                'Content-Type':"application/json"
            }
        })
        console.log(response)
    } catch (error) {
        
    }
});

module.exports ={
    openAIController,
};