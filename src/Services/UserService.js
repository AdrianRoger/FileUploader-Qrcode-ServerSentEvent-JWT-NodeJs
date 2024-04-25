const userRepository = require('../repository/UserRepository.js');
const { NotFoundException } = require('../utils/Exception.js');

class UserService {
  async getUsers() {
    try {
      return await userRepository.getUsers();
    } catch (excetion) {
      throw excetion;
    }
  }

  async getUserById({ id }) {
    try {
      const userFound = await userRepository.getUserById({ id });

      if (!userFound) {
        throw new NotFoundException('User not Found.');
      }

      return userFound;
    } catch (exception) {
      throw exception;
    }
  }

  async getUserByUsername({ username }) {
    try {
      const userFound = await userRepository.getUserByUsername({ username });

      if (!userFound) {
        throw new NotFoundException('User not found.');
      }

      return userFound;
    } catch (exception) {
      throw exception;
    }
  }

  async createUser({ username, password, type }) {
    console.log(password);
    try {
      //criar verificação usando getUserByUsername
      //se username já estiver em uso returnar statusCode 409 Conflict

      const createdUser = await userRepository.createUser({
        username: username,
        password: password,
        type: type,
      });

      return createdUser;
    } catch (exception) {
      throw exception;
    }
  }

  async updateUser({ id, username, password }) {
    try {
      const userToUpdate = await userRepository.getUserById({ id });

      if (!userToUpdate) {
        throw new NotFoundException('User not Found.');
      }

      //usar a mesma verificação de conflict para username

      const updatedUser = await userRepository.updateUser({
        id,
        username,
        password
      });

      return updatedUser;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteUser({ id }) {
    try {
      const userToDelete = await userRepository.getUserById({ id });

      if (!userToDelete) {
        throw new NotFoundException('User not Found.');
      }

      const deletedUser = await userRepository.deleteUser({ id });

      return deletedUser;
    } catch (exception) {
      throw exception;
    }
  }

}

const userService = new UserService();
module.exports = userService;
