const express = require('express');
const loginController = require('../controllers/LoginController');

const loginRouter = express.Router();

loginRouter.post('/', loginController.authentication.bind(loginController));
loginRouter.get('/exit', loginController.logOut.bind(loginController));

module.exports = loginRouter;