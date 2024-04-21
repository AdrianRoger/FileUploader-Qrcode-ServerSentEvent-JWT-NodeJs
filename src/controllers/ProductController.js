const productService = require('../Services/ProductService.js');
const { BadRequestException } = require('../utils/Exception.js');
const HttpResponse = require('../utils/HttpResponse.js');

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await productService.getProducts();

      const response = new HttpResponse({
        statusCode: 200,
        data: products
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getProductById(req, res) {
    try {
      const id = req.params.id;
      const product = await productService.getProductById({ id });

      const response = new HttpResponse({
        statusCode: 302,
        data: product
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async createProduct(req, res) {
    try {
      const name = req.body.name;
      const description = req.body.description;
      const imgName = req.file.filename;

      const createdProduct = await productService.createProduct({
        name,
        description,
        imgName: imgName,
      });

      const response = new HttpResponse({
        statusCode: 201,
        data: createdProduct
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async updateProduct(req, res){
    try{
      const id = req.params.id;
      const name = req.body.name;
      const description = req.body.description;
      const imgName = req.file.filename;

      const updatedProduct = await productService.updateProduct({
        id,
        name,
        description,
        imgName: imgName,
      });
      
      const response = new HttpResponse({
        statusCode: 200,
        data: updatedProduct
      });
      
      res.status(response.statusCode).json(response);
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async deleteProduct(req, res){
    try{
      const id = req.params.id;

      const deletedProduct = await productService.deleteProduct({ id });

      const response = new HttpResponse({
        statusCode: 200,
        data: deletedProduct
      });

      res.status(response.statusCode).json(response);
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }
}

const productController = new ProductController();

module.exports = productController;
