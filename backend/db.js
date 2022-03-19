const mongoose = require('mongoose');
const url="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connecttomongoose=async()=>{
  mongoose.connect(url,()=>{
      console.log("Connected to mongodb");
  })
  
}

module.exports = connecttomongoose;