const productRepository = require('../repository/ProductRepository.js');
const { NotFoundException } = require('../utils/Exception.js');
const fileDeleter = require('../utils/FileDeleter.js');
const fs = require('fs');
const path = require('path');

class ProductService {
  async getProducts() {
    try {
      return await productRepository.getProducts();
    } catch (exception) {
      throw exception;
    }
  }

  async getProductById({ id }) {
    try {
      return await productRepository.getProductById({ id });
    } catch (exception) {
      throw exception;
    }
  }

  async createProduct({ name, description, imgName }) {
    try {
      const createdProduct = await productRepository.createProduct({
        name,
        description,
        imgName
      });

      return createdProduct;
    } catch (exception) {
      throw exception;
    }
  }

  async updateProduct({ id, name, description, imgName }) {
    try {
      const productToUpdate = await productRepository.getProductById({ id });

      if (!productToUpdate) {
        throw NotFoundException('Product not found.');
      }

      await fileDeleter.deleteFileByName(productToUpdate.imgName);

      const updatedProduct = await productRepository.updateProduct({
        id, name, description, imgName
      });

      return updatedProduct;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteProduct({ id }) {
    try {
      const productToDelete = await productRepository.getProductById({ id });

      if (!productToDelete) {
        throw NotFoundException('Product not found.');
      }

      await fileDeleter.deleteFileByName(productToDelete.imgName);

      const deletedProduct = await productRepository.deleteProduct({ id });

      console.log(deletedProduct);
      return deletedProduct;
    } catch (exception) {
      throw exception;
    }
  }
}

const productService = new ProductService();

module.exports = productService;