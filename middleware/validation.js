const {check} = require("express-validator");

const uservalidator = [
    check('name').notEmpty().withMessage("express Enter Name"),
    check('email').isEmail().withMessage("express Enter Email Properly"),
    check('password').isStrongPassword({minLength:8,minLowercase:1,minUppercase:1,minNumbers:1,minSymbols:1}).withMessage("express Password must contain 1 Uppercase, 1 Lowercase, 1 Number, 1 Symbol")
];

const loginValidator = [
    check('email').isEmail().withMessage("express Enter Email Properly"),
    check('password').notEmpty().withMessage("express Password Properly")
];

const productValidator = [
    check('name')
        .notEmpty().withMessage("express Enter product name properly")
        .isAlphanumeric().withMessage("express Product name Should be Alphanumaric"),
    check('price')
        .notEmpty().withMessage("express Enter Price properly")
        .isDecimal().withMessage("express Price Should be in decimal"),
    check('description')
        .isLength({max:255}).withMessage("express Maximum 255 characters allowed"),
    check('productType')
        .notEmpty().withMessage("express Enter productType properly")
        .isIn(['Print Product','Promotional Product']).withMessage("express Option is incorrect"),
    check('productImage').withMessage("express")
]


module.exports = {uservalidator,loginValidator}