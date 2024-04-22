const express = require('express');
const productRouter = require('./productRoutes');
const userRouter = require('./userRoutes');

const router = express.Router();

router.use('/products', productRouter);
router.use('/users', userRouter);

module.exports = router;