const express = require('express');
const router = express.Router();
const {productList, viewProduct, addProduct, updateProduct, deleteProduct} = require("../controller/product-controller");
const multer = require('multer');
const {validateResult,storage} = require("../middleware/helper-function");
const upload = multer({ storage: storage })


router.get('/',productList);
router.get('/:id',viewProduct);
router.post('/',upload.single('productImage'),addProduct);
router.put('/:id',upload.single('productImage'),updateProduct);
router.delete('/:id',deleteProduct);

module.exports = router;