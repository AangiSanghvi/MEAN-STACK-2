//signup login public url
const UserModel = require("../model/usersModel")
module.exports.signup = async function(req, res){
    //validation, email unique
    // let user = new UserModel({
    //     firstName:req.body.firstName,
    //     email:req.body.email,
    //     password:req.body.password
    // })
    let user = new UserModel(req.body)
    let data = await user.save()

    res.json({data:data, msg:"Signup done", rcode:200})
}

//login
module.exports.login = async function(req, res){
    let email = req.body.email
    let password = req.body.password

    let user = await UserModel.findOne({email:email})

    if(user && user.password == password){ //success
        token = parseInt(Math.random()*10000000000)
        console.log("Token --> "+token)
        user.token = token
        res.json({"msg":"Login done", "data":user, "rcode":200}) 
    }
    else
    {
        res.json({"data":req.body, "msg":"Invalid Credentials", "rcode":-9})
    }
    
}