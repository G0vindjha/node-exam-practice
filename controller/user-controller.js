const userSchema = require("../model/user-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
const userCreate = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const userCreated = await userSchema.create({name,email,password});
        res.send(userCreated);
    } catch (error) {
        res.json({errors:error});
    }
}
const userLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userSchema.findOne({email});
        if(!user) return res.send("Something is wrong try again");
        const userId = user._id;
        bcrypt.compare(password,user.password,function(err,result){
            if(result){
                let token = jwt.sign({userId},process.env.JWT_SECRATE);
                res.cookie("token",token);
                res.status(200).json({message:"Login Success",user});
            }else{
                res.status(500).send("Something went wrong");
            }
        });
    } catch (error) {
         res.json({errors:error});
    }
}

const userLogout = async (req,res) => {
    res.cookie("token","");
    res.send("You have been logged out");
}
module.exports = {userCreate,userLogin,userLogout};