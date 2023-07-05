//authentication.middleware.js


module.exports = function(req, res, next)
{
    if(req.headers.token == undefined || req.headers.token != 123)
    {
        res.json({msg:"Please login to access the service.", data:"",rcode:-9 })
    }
    else
    {
        next() // go ahead
    }
}