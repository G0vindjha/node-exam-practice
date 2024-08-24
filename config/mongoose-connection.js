const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CRED,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Mongoose Connection Established"))
.catch(err => console.error("Mongoose Connection Error : ",err));