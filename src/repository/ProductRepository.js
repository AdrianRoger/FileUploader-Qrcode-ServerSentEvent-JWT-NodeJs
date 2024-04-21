const database = require('../database/Database.js');
const Product = require('../models/ProductModel.js');
const { InternalServerException, NotFoundException } = require('../utils/Exception.js');
require('dotenv').config();

class ProductRepository {
  async getProducts() {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM product`,
      });

      const products = result.map(result => {
        return new Product({
          id: result.id,
          name: result.name,
          description: result.description,
          imgName: result.img_name,
        });
      });

      return products ?? [];
    } catch (error) {
      console.log(`ProductRepository::getProducts error [${error}]`);
      throw new InternalServerException();
    }
  }

  async getProductById({ id }) {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM product where id = $1`,
        args: [id],
      });

      const product = new Product({
        id: result[0].id,
        name: result[0].name,
        description: result[0].description,
        imgName: result[0].img_name,
      });

      return product;
    } catch (error) {
      console.error(`ProductRepository::getProductById error [${error}]`);
      throw new NotFoundException('Product not found.');
    }
  }

  async createProduct({ name, description, imgName }) {
    try {
      const result = await database.executeQuery({
        query: "INSERT INTO product (name, description, img_name) VALUES ($1, $2, $3) RETURNING *",
        args: [name, description, imgName],
      });

      const createdProduct = new Product({
        id: result[0].id,
        name: result[0].name,
        description: result[0].description,
        imgName: result[0].img_name,
      });

      return createdProduct;
    } catch (error) {
      console.error(`ProductRepository::createProduct error [${error}]`);
      throw new InternalServerException();
    }
  }

  async updateProduct({ id, name, description, imgName }){
    try{
      const result = await database.executeQuery({
        query: `UPDATE product SET name = $2, description = $3, img_name = $4 WHERE id = $1 RETURNING *`,
        args: [id, name, description, imgName],
      });

      const updatedProduct = new Product({
        id: result[0].id,
        name: result[0].name,
        description: result[0].description,
        imgName: result[0].img_name,
      });

      return updatedProduct;
    }catch(error){
      console.error(`ProductRepository::updateProduct error [${error}]`);
      throw new InternalServerException();
    }
  }

  async deleteProduct({ id }){
    try{
      const result = await database.executeQuery({
        query: `DELETE FROM product WHERE id = $1 RETURNING *`,
        args: [id]
      });

      const deletedProduct = new Product({
        id: result[0].id,
        name: result[0].name,
        description: result[0].description,
        imgName: result[0].img_name
      });

      return deletedProduct;
    }catch(error){
      console.error(`ProductReposaitory::deleteProduct error [${error}]`);
      throw new InternalServerException();
    }
  }
}

const productRepository = new ProductRepository();

module.exports = productRepository;