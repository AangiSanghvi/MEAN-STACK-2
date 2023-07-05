const express = require("express")
const productController = require("../controller/productControllerDb")
const route = express.Router()

//product routes - mapping
route.post("/addproduct2", productController.addProduct)
route.get("/products", productController.getAllProducts)
route.get("/getproduct/:productId", productController.getProductById)
route.delete("/deleteproduct/:productId", productController.deleteProductById)
route.delete("/deleteall", productController.deleteAll)
route.post("/products/filter", productController.filterProduct)
route.put("/updateproduct", productController.updateProduct)

module.exports = route