const ProductModel = require("../model/productModel")
module.exports.addProduct = function(req, res) {

    console.log(req.body)

    let productName = req.body.productName
    let price = req.body.price
    let qty = req.body.qty
    let categoryId = req.body.categoryId

    let product = new ProductModel({
       
        "productName": productName,
        "price": price,
        "qty": qty,
        "categoryId": categoryId
    });

    product.save();

    res.json({ "msg": "Product Added", "data": product, "rcode": 200 }) // rcode - response code
}

//REFERENCE CODE FOR CALLBACK (FYI - CALLBACK IS NO LONGER SUPPORTED BY FIND)
/* module.exports.getAllProducts = function(req, res){
    
    ProductModel.find(function(err,data){
        if(err){
            res.json({"msg":"Something went wrong", "data":err, "rcode":-9})
        }
        else{
            res.json({"msg":"Product List", "data":products, "rcode":200})
        }
    })
} */

//export+function  so, no need to export this function
module.exports.getAllProducts = function(req,res){
    // console.log(req.headers)
    // //console.log(req.headers.token)
    // if(req.headers.token == undefined || req.headers.token != 123)
    // {
    //     res.json({"msg":"Please login to access this service.", "data":"", "rcode":-9})
    // }else
    // { }
        ProductModel.find().populate("categoryId").exec().then((data)=>{
            res.json({"msg":"Product List", "data":data, "rcode":200})
        }).catch((err)=>{
            res.json({"msg":"Something went wrong", "data":err, "rcode":-9})
        })
    
}

module.exports.getProductById = function(req, res){
    let productId = req.params.productId
    ProductModel.findById({_id:productId}).then((data)=>{
        if(data === null){
            res.json({"msg":"Product not found", "data":data, "rcode":-9})
        }
        else{
        res.json({"msg":"Product List", "data":data, "rcode":200})
        }
    }).catch((err)=>{
        res.json({"msg":"Something went wrong", "data":err, "rcode":-9})
    })
}

module.exports.deleteProductById = function(req, res){
    let productId = req.params.productId
    ProductModel.findByIdAndDelete({_id:productId}).then((data)=>{
        res.json({"msg":"Product Deleted", "data":data, "rcode":200})
    }).catch((err)=>{
        res.json({"msg":"Something went wrong", "data":err, "rcode":-9})
    })
}

module.exports.deleteAll = function(req, res){
    ProductModel.deleteMany().then((data)=>{
        res.json({"msg":"All deleted", "data":data, "rcode":200})
    }).catch((err)=>{
        res.json({"msg":"Something went wrong", "data":data, "rcode":-9})
    })
}

//  27-05-2023  filter product -> maxprice min price
module.exports.filterProduct = function(req, res){
    let minPrice = req.body.minPrice
    let maxPrice = req.body.maxPrice
    ProductModel.find({
        $and: [
            {
                price: {$gt: minPrice}
            },
            {
                price: {$lt:  maxPrice}
            }
        ]
    }).then((data)=>{
        if(data.length == 0)
        {
            res.json({"msg":"No data found", "data":req.body, "rcode":-9})
        }
        else
        {
            res.json({"msg":"Product Filter", "data":data, "rcode":200})
        }
    }).catch((err)=>{
        res.json({"msg":"Something Went Wrong", "data":err, "rcode":-9})
    })
}

module.exports.updateProduct = function(req, res){
    let productId = req.body.productId
    let price = req.body.price
    let qty = req.body.qty
    ProductModel.findByIdAndUpdate({_id:productId}, {"price":price, "qty":qty}).then((data)=>{
        res.json({"msg":"Product updated successfully", "data":data, "rcode":200})
    }).catch((err)=>{
        res.json({"msg":"Product updation failed", "data":err, "rcode":-9})
    })
}