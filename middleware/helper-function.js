const {validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const path = require('path');
const userSchema = require("../model/user-model");
const multer = require('multer');



const validateResult = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    next();
}

const userLoggedIn = (req,res,next) => {
    const token = req.cookies.token;
    if(token){
        const user = jwt.verify(req.cookies.token,process.env.JWT_SECRATE);
        const userExits = userSchema.findOne({_id:user.userId});
        if(!userExits) return res.status(200).json({message:"Something went wrong Login Again"});
        next();
    }else{
        res.status(200).json({message:"Login First"});
    }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.IMG_PATH)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
  }
})


module.exports = {validateResult,userLoggedIn,storage};
