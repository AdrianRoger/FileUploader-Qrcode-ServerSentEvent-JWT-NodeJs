const express = require('express');
const productController = require('../controllers/ProductController.js');
const upload = require('../middlewares/MulterMiddleware.js');


const productRouter = express.Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductById);
//o middleware upload.single é usado para lidar com o upload de um unico arquivo
productRouter.post('/', upload.single('image'), productController.createProduct);
productRouter.put('/:id', upload.single('image'), productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter; 
