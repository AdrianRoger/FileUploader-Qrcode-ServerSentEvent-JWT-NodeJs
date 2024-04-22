const User = require('../models/User.js');
const database = require('../database/Database.js');
const { InternalServerException, NotFoundException } = require('../utils/Exception.js');

class UserRepository {
  async getUsers() {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM users`,
      });

      const users = result.map(user => {
        return new User({
          id: user.id,
          username: user.username,
          password: user.password,
          type: user.type,
        });
      });

      return users ?? [];
    } catch (error) {
      console.error(`UserRepository::getUsers error [${error}]`);
      throw new InternalServerException();
    }
  }

  async getUserById({ id }) {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM users WHERE id = $1`,
        args: [id],
      });

      const userFound = new User({
        id: result[0].id,
        username: result[0].username,
        password: result[0].password,
        type: result[0].type
      });

      return userFound;
    } catch (error) {
      console.error(`UserRepository::getUsers error [${error}]`);
      throw new NotFoundException();
    }
  }

  async getUserByUsernameAndPassword({ username, password }) {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM users WHERE username = $1 AND password = $2`,
        args: [username, password]
      });

      const userFound = new User({
        id: result[0].id,
        username: result[0].username,
        password: result[0].password,
        type: result[0].type,
      });

      return userFound;
    } catch (error) {
      console.error(`UserRepository::getUserByUsernameAndPassword error [${error}]`);
      throw new NotFoundException();
    }
  }

  async createUser({ username, password, type }) {
    try {
      const result = await database.executeQuery({
        query: `INSERT INTO users (username, password, type) VALUES ($1, $2, $3) RETURNING *`,
        args: [username, password, type],
      });

      const createdUser = new User({
        id: result[0].id,
        username: result[0].username,
        password: result[0].password,
        type: result[0].type,
      });

      return createdUser;
    } catch (error) {
      console.error(`UserRepository::createUser error [${error}]`);
      throw new InternalServerException();
    }
  }

  async updateUser({ id, username, password }) {
    try {
      const result = await database.executeQuery({
        query: `UPDATE users SET username = $2, password = $3 WHERE id = $1 RETURNING *`,
        args: [id, username, password],
      });

      const updatedUser = new User({
        id: result[0].id,
        username: result[0].username,
        password: result[0].password,
        type: result[0].type,
      });

      return updatedUser;
    } catch (error) {
      console.error(`UserRepository::updateUser error [${error}]`);
      throw new InternalServerException();
    }
  }

  async deleteUser({ id }){
    try{
      const result = await database.executeQuery({
        query: `DELETE FROM users WHERE id = $1 RETURNING *`,
        args: [id],
      });

      const deletedUser = new User({
        id: result[0].id,
        username: result[0].username,
        password: result[0].password,
        type: result[0].type,
      });

      return deletedUser;
    }catch(error){
      console.error(`UserRepository::deleteUser error [${error}]`);
      throw new InternalServerException();
    }
  }

}

const userRepository = new UserRepository();
module.exports = userRepository;