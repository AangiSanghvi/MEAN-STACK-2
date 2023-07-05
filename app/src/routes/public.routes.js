const express = require("express")
const sessionControllerDb = require("../controller/sessionControllerDb")
const router = express.Router()


router.post("/signupdb", sessionControllerDb.signup)
router.post("/logindb", sessionControllerDb.login)

//export
module.exports = router