const express = require('express');
const longinRouter = require('./loginRoutes')
const userRouter = require('./userRoutes');
const productRouter = require('./productRoutes');

const router = express.Router();

router.use('/login', longinRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;