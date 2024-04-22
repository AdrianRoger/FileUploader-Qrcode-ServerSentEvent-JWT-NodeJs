const userService = require('../Services/UserService.js');
const { BadRequestException } = require('../utils/Exception.js');
const HttpResponse = require('../utils/HttpResponse.js');


class UserController {
  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();

      const response = new HttpResponse({
        statusCode: 200,
        data: users,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getUserById(req, res) {
    try {
      const id = req.params.id;

      const user = await userService.getUserById({ id });

      const response = new HttpResponse({
        statusCode: 200,
        data: user,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async authenticateUser(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new BadRequestException('Username and password are required.');
      }

      const userFound = await userService.getUserByUsernameAndPassoword({ username, password });

      const response = new HttpResponse({
        statusCode: 200,
        data: userFound,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async createUser(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const type = req.body.type;

      if (!username || !password || !type) {
        throw new BadRequestException('Username, password and type are required.');
      }

      if (type !== 'admin' && type !== 'client') {
        throw new BadRequestException('type attribute must be admin ou client.');
      }

      const createdUser = await userService.createUser({ username, password, type });

      const response = new HttpResponse({
        statusCode: 201,
        data: createdUser,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const username = req.body.username;
      const password = req.body.password;

      if (!id || !username || !password) {
        throw new BadRequestException('Incorrect params for update user.');
      }

      const updatedUser = await userService.updateUser({ id, username, password });

      const response = new HttpResponse({
        statusCode: 200,
        data: updatedUser,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;

      const deletedUser = await userService.deleteUser({ id });

      const response = new HttpResponse({
        statusCode: 200,
        data: deletedUser,
        message: 'Successfully deleted',
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }
}

const userController = new UserController();
module.exports = userController;