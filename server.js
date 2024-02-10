const express = require('express');
const usersRouter = require('./routes/usersRouter');
require('./uitils/connectDB')()
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
//Routes
app.use("/api/v1/users", usersRouter);


app.listen(PORT, console.log(`Server is running on port ${PORT}`));