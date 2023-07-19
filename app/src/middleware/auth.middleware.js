//authentication.middleware.js
const jwt = require("jsonwebtoken")
const { SEC_KEY } = process.env

module.exports = function(req, res, next)
{
    console.log("in authmiddleware")
    //token->db
    jwt.verify(req.headers.token, SEC_KEY, function(err, decoded){
        if(err)
        {
            console.log("error = > ", err)
            res.json({msg:"Please login to access the service.", data:"",rcode:-9 })
        }
        else
        {
            console.log("decoded => ",decoded)
            next() // go ahead
        }
    })
    
}