const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/BACKEND')

.then(()=>{
    console.log("database is connected")
})
.catch(()=>{
    console.log("not connected to database")
})
