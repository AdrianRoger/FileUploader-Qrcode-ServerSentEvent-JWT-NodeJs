const userService = require('../Services/UserService');
const passwordUtils = require('../utils/PasswordUtils');
const jwt = require('jsonwebtoken');
const HttpResponse = require('../utils/HttpResponse');
const { UnauthorizedException } = require('../utils/Exception');
const { config } = require('dotenv');

class LoginController {
  constructor() {
    config();
    this.secretKey = process.env.SECRET_KEY;
  }

  async authentication(req, res) {
    try {
      const { username, password } = req.body;

      const error = "Usuário e/ou senha inválidos!";
      if (!username || !password) {
        res.cookie('session_id', '', { expires: new Date(0) });
        throw new UnauthorizedException(error);
      }

      const foundUser = await userService.getUserByUsername({ username });
      if (!foundUser) {
        res.cookie('session_id', '', { expires: new Date(0) });
        throw new UnauthorizedException(error);
      }

      const match = await passwordUtils.comparePassword(password, foundUser.password);
      if (!match) {
        res.cookie('session_id', '', { expires: new Date(0) });
        throw new UnauthorizedException(error);
      }

      const user = {
        username: foundUser.username,
        type: foundUser.type,
      };

      const response = new HttpResponse({
        statusCode: 200,
        data: user,
      });

      const sessionToken = await jwt.sign({ user }, this.secretKey);

      res.cookie('session_id', sessionToken, { maxAge: 900000, httpOnly: true });
      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }

  }

  async logOut(req, res) {
    res.cookie('session_id', '', { expires: new Date(0) });
    return res.status(200).json({ message: "Você saiu do sistema!" });
  }

  async getLogin(req, res) {
    const user = req.user;
    res.status(200).json(user);
  }

}

const loginController = new LoginController();
module.exports = loginController;