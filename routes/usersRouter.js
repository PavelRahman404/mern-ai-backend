const express = require('express');
const { register } = require('../controllers/usersController');
register
const usersRouter = express.Router();

usersRouter.post("/register", register);

module.exports = usersRouter;