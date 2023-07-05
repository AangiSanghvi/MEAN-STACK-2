//27-05-2023
const mongoose = require("mongoose")
//categoryid, categoryname
const CategorySchema = new mongoose.Schema({
    categoryName :{
        type:String,
        //required:[true, "Please enter category name"],
        required:{value:true, message:"Please enter category name"},
        lowercase:true
    }
})

module.exports = mongoose.model("Category", CategorySchema) // table name in database - categories 