const { urlencoded } = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const path = require('path');
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());

const userRouter = require("./routes/user-router");
const productRouter = require("./routes/product-router");

// Routes
app.use("/api/auth",userRouter);
app.use("/api/products",productRouter);

// Connection
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})
