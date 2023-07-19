const express = require("express")
require("./app/src/config/dbconfig").getDbConnection()

const categoryRoutes = require("./app/src/routes/category.routes")
const productRoutes = require("./app/src/routes/product.routes")
const publicRoutes = require("./app/src/routes/public.routes")
const sessionControllerDb = require("./app/src/controller/sessionControllerDb")

const authMiddleware = require("./app/src/middleware/auth.middleware")
const app = express() // created express' object and saved it into app

//db connection


//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//bind it with app
//private -> authenticated
app.use("/admin",authMiddleware, categoryRoutes)
app.use("/admin", authMiddleware, productRoutes) // url, middleware, url-location/var name

//public routes
app.use("/public", publicRoutes)
app.get("/signup", sessionControllerDb.signup)
app.get("/getallusers", sessionControllerDb.getAllusers)

//port
app.listen(9999)
console.log("server started at 9999");