const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

//connection
require("../config/mongoose-connection");

//Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator(value) {
                if (!validator.isEmail(value)) {
                    throw Error("Enter Valid Email");
                }
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, "Min 8 charater is required"],
        validate: {
            validator(value) {
                if (!validator.isStrongPassword(value,{
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                })) {
                    throw Error("Password must contains one Uppercase, one Lowercase, one number, one symbol");
                }
            }
        },
        message: "Enter Valid Password"
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    
    if (user.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

//Export
module.exports = mongoose.model("users", userSchema);