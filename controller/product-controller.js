const productSchema = require("../model/product-model");

const productList = async (req,res) => {
    try {
    res.send("hello");
       
    } catch (error) {
        res.json({errors:error});
    }
}
const viewProduct = async (req,res) => {
    try {
    res.send("hello");
       
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
    res.send("hello");
       
    } catch (error) {
        res.json({errors:error});
    }
}
const deleteProduct = async (req,res) => {
    try {
    res.send("hello");
       
    } catch (error) {
        res.json({errors:error});
    }
}
module.exports = {productList, viewProduct, addProduct, updateProduct, deleteProduct};
