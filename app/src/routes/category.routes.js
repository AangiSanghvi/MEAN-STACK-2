const express = require("express")
const router = express.Router()
const categoryController = require("../controller/categoryController")

//category routes
router.post("/addcategory", categoryController.addCategory)
router.get("/allcategories", categoryController.getAllCategories)
router.get("/getcategorybyid/:categoryId", categoryController.getCategoryById)
router.delete("/delcategorybyid/:categoryId", categoryController.deleteCategoryById)
router.delete("/delallcategories", categoryController.deleteAllCategories)

module.exports = router