const router = require('express').Router();
const { createProduct, getProduct, getAllProducts } = require('../controllers/product')
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middlewares/auth')

//create
router.post('/', verifyTokenAndAdmin, createProduct);
router.get('/:id', getProduct);
router.get('/', getAllProducts);


module.exports = router;


