const path = require('path');
const fs = require('fs').promises;

class FileDeleter {
  async deleteFileByName(filename){
    try{
      const filePath = path.join(__dirname, '../public/uploads', filename);
      
      await fs.unlink(filePath);
      console.log('Arquivo excluído com sucesso.');
      return true;
    }catch(error){
      if(error.code === 'ENOENT'){
        console.log('Arquivo Nao existe');
      }else{
        console.log('Erro ao excluír arquivo', error);
      }
      //pode ser criada uma exceção personalizada para utilizar aqui
      return false;
    }
  }
  
}

const fileDeleter = new FileDeleter();
module.exports = fileDeleter;