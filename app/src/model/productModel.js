/*
productmodel - class
object - save()
db.product.insertOne({})
*/
const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    productName:String,
    price:Number,
    qty:Number,
    //making categoryId foreign key in product table
    categoryId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category" // spelling should be same as the table name spelling given in categoryModel file
    }
});

module.exports = mongoose.model('Product', ProductSchema); //products

