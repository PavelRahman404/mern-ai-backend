const express = require('express')

const usersRouter = express.Router();

usersRouter.post("/register", register);

module.exports = usersRouter;