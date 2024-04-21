const express = require('express');
const productRouter = require('./productRoutes')

const router = express.Router();

router.use('/products', productRouter);

module.exports = router;