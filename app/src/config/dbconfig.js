//import
const mongoose = require("mongoose") // used for db connection

//you cant access .env file without writing this line of code
require('dotenv').config() // this line will give you all the things that you require from the .env file using 'process' keyword as shown below
//const MONGO_URI = process.env.MONGO_URI
const {MONGO_URI} = process.env //to initialize environment

//db connection
module.exports.getDbConnection = function(req, res)
{
    //to read the environment
    mongoose.connect(MONGO_URI).then(()=>console.log("Database Connected ^.^")).catch(()=>console.log("Database Connection Failed -_-"))

}