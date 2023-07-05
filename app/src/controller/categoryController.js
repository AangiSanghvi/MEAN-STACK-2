//27-05-2023
//will have to bring the model(table) here first
const CategoryModel = require("../model/categoryModel")

//make a function now
module.exports.addCategory = function(req, res){
    let category = new CategoryModel({
        categoryName:req.body.categoryName
    })
    category.save().then((data)=>{
        res.json({"msg":"Category Saved", "data":data, "rcode":200})
    }).catch((err=>{
        res.json({"msg":"Something Went Wrong", "data":err, "rcode":-9})
    }))
}

module.exports.getAllCategories = function(req, res){
    CategoryModel.find().then((data)=>{
        res.json({"msg":"All categories", "data":data, "rcode":200})
    }).catch((err)=>{
        res.json({"msg":"Something went wrong", "data":err, "rcode":-9})
    })
}

module.exports.getCategoryById = function(req, res){
    let categoryId = req.params.categoryId
    CategoryModel.findById({_id:categoryId}).then((data)=>{
        if(data === null)
        {
            res.json({"msg":"No data entered", "data":data, "rcode":-9})
        }
        else
        {
            res.json({"msg":"Category Found By ID", "data":data, "rcode":200})
        }
    }).catch((err)=>{
        res.json({"msg":"Something went wrong", "data":err, "rcode":-9})
    })
}

module.exports.deleteCategoryById = function(req, res){
    let categoryId = req.params.categoryId
    CategoryModel.findByIdAndDelete({_id:categoryId}).then((data)=>{
        res.json({"msg":"Category deleted successfully", "data":data, "rcode":200})
    }).catch((err)=>{
        res.json({"msg":"Something went wrong", "data":err, "rcode":-9})
    })
}

module.exports.deleteAllCategories = function(req, res){
    CategoryModel.deleteMany().then((data)=>{
        res.json({"msg":"All Categories deleted successfully", "data":data, "rcode":200})
    }).catch((err)=>{
        res.json({"msg":"Something went wrong", "data":err, "rcode":-9})
    })
}