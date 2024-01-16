const mongoose = require('mongoose');
const dotenv = require("dotenv")

dotenv.config();
const URI = process.env.MONGO_URI

mongoose.connect(URI, { useNewUrlParser: true })

.then(()=>{
    console.log("database is connected")
})
.catch(()=>{
    console.log("not connected to database")
})
