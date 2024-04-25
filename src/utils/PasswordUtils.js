const bcrypt = require('bcrypt');

class PasswordUtils {
  async hashPassword(pw) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(pw, salt);
    } catch (error) {
      console.error('Erro ao gerar o hash da senha: ', error);
      return false
    }
  }

  async comparePassword(pw, hashedPw) {
    try {
      return await bcrypt.compare(pw, hashedPw);
    } catch (error) {
      console.error('Erro ao comparar as senhas: ', error);
      return false;
    }
  }
}

const passwordUtils = new PasswordUtils();
module.exports = passwordUtils;