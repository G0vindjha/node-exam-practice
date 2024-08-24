const { Decimal128 } = require('bson');
const mongoose = require('mongoose');
const { type } = require('os');
const validator = require('validator');

//connection
require("../config/mongoose-connection");


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate:[validator.isAlphanumeric,"Enter Alphanumaric String"]
    },
    price:{
        type:String,
        required:true,
        validate:{
            validator(value){
                if(!validator.isDecimal(value)){
                    throw new Error("Price should be in decimal");
                }
            }
        }
    },
    description:{
        type:String,
        maxlength:[255,"Maximum 255 character available"]
    },
    productType:{
        type:String,
        required:true,
        enum:['Print Product','Promotional Product']
    },
    productImage:{
        type:String,
        default: 'default-image.jpg',
        validate:{
            validator(value){
                if(!/\.jpeg|jpg|png|gif$/i.test(value) && !validator.isEmpty(value)){
                    throw Error("Enter a valid Image");
                }
            },
            message:"Image Validation failed"
        }
    }
});


module.exports = mongoose.model('products', productSchema);