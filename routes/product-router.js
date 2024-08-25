const express = require('express');
const router = express.Router();
const {productList, viewProduct, addProduct, updateProduct, deleteProduct,viewImage} = require("../controller/product-controller");
const multer = require('multer');
const {productValidator} = require("../middleware/validation");
const {validateResult,userLoggedIn,storage} = require("../middleware/helper-function");
const upload = multer({ storage: storage })


router.get('/',userLoggedIn,productList);
router.get('/:id',userLoggedIn,viewProduct);
router.post('/',userLoggedIn,upload.single('productImage'),productValidator,validateResult,addProduct);
router.put('/:id',userLoggedIn,upload.single('productImage'),productValidator,validateResult,updateProduct);
router.delete('/:id',userLoggedIn,deleteProduct);
router.get('/:id/image',userLoggedIn,viewImage);

module.exports = router;