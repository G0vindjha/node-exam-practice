const { isEmpty } = require("validator");
const productSchema = require("../model/product-model");
const fs = require('fs').promises;
const path = require('path');

const productList = async (req,res) => {
    try {
        const page = parseInt(req.query.page,10);
        const limit = parseInt(req.query.limit,10);
        if(!isNaN(limit) && limit > 0 && !isNaN(page) && page >0 ){
            const skip = (page - 1) * limit;
            const products = await productSchema.find().skip(skip).limit(limit);
            res.send(products);
        }else{
            const products = await productSchema.find();
            res.send(products);
        }
    } catch (error) {
        res.send(error);
    }
}
const viewProduct = async (req,res) => {
    try {
        const id = req.params.id;    
        const product = await productSchema.find({_id:id});
        res.send(product);
    } catch (error) {
        res.json({errors:error});
    }
}
const addProduct = async (req,res) => {
    try {
        const {name, price, description, productType} = req.body;
        const productImage = req.file ? req.file.filename : 'default-image.jpg';
        const productCreated = await productSchema.create({name, price, description, productType,productImage});
        res.send(productCreated);
    } catch (error) {
        res.json({errors:error});
    }
}
const updateProduct = async (req,res) => {
    try {
        const id = req.params.id;    
        const product = await productSchema.findOne({_id:id});
        const productImage = req.file ? req.file.filename : 'default-image.jpg';
        if(productImage == 'default-image.jpg' || req.file){
            await fs.unlink(process.env.IMG_PATH + "/" + product.productImage);
        }
        const {name, price, description, productType} = req.body;
        const productUpdate = await productSchema.findOneAndUpdate({_id:id},{name, price, description, productType,productImage});
        res.send(productUpdate);
    } catch (error) {
        res.json({errors:error});
    }
}
const deleteProduct = async (req,res) => {
    try {
        const id = req.params.id;    
        const productDeleted = await productSchema.findOneAndDelete({_id:id});
        if(productDeleted.productImage != "default-image.jpg"){
            await fs.unlink(process.env.IMG_PATH+"/" +productDeleted.productImage);
        }
        res.json({message:"Product Deleted",product:productDeleted});
    } catch (error) {
        res.json({errors:error});
    }
}

const viewImage = async (req,res) => {
    try {
        const id = req.params.id;    
        const product = await productSchema.findOne({_id:id});
        res.sendFile(path.join(path.resolve(__dirname,'..'), process.env.IMG_PATH+"/" +product.productImage))
    } catch (error) {
        res.json({errors:error});
    }
}
module.exports = {productList, viewProduct, addProduct, updateProduct, deleteProduct,viewImage};
