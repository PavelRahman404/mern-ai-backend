const mongoose = require('mongoose');
//password: YXK2NuWED69TOv3Q
//username:paveltauker
const connectDB =  async ()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://paveltauker:YXK2NuWED69TOv3Q@cluster0.aoatgch.mongodb.net/mern-ai-chat?retryWrites=true&w=majority')
        console.log(`Mongodb connected ${conn.connection.host} `)
    } catch (error) {
        console.error(`Error connecting to MongoDB ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;