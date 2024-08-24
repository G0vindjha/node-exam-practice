const express = require('express');
const router = express.Router();
const {userCreate,userLogin,userLogout} = require("../controller/user-controller");
const multer = require('multer');
const upload = multer();
const {uservalidator,loginValidator} = require("../middleware/validation");
const {validateResult,userLoggedIn} = require("../middleware/helper-function");

router.post('/register',upload.none(),uservalidator,validateResult,userCreate);
router.post('/login',upload.none(),loginValidator,validateResult,userLogin);
router.get('/logout',userLogout);
router.get('/check',userLoggedIn);

module.exports = router;