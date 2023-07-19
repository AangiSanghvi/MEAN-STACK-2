//signup login public url
const UserModel = require("../model/usersModel")
const jwt = require("jsonwebtoken")
const {SEC_KEY} = process.env
const bcrypt = require("bcrypt")

module.exports.signup = async function(req, res){
    //validation, email unique
    // let user = new UserModel({
    //     firstName:req.body.firstName,
    //     email:req.body.email,
    //     password:req.body.password
    // })
    let pass = req.body.password
    let encpass = bcrypt.hashSync(pass,10)
    console.log(encpass)
    req.body.password = encpass

    let user = new UserModel(req.body)
    let data = await user.save()

    res.json({data:data, msg:"Signup done", rcode:200})
    
}

//login
module.exports.login = async function(req, res){
    let email = req.body.email
    let password = req.body.password

    let user = await UserModel.findOne({email:email})
    //user && user.password == password
    if(user && bcrypt.compareSync(password,user.password)){ //success
        //generate token using jwt
        //token = jwt.sign({"email":user.email, "userId":user._id, "role":"user"}, SEC_KEY)
        token = jwt.sign({"authId":user._id, "authority":"user"}, SEC_KEY, {expiresIn:"7d"})
        console.log("Token --> "+token)
        
        res.json({"msg":"Login done", "data":user, "rcode":200, token:token}) 
    }
    else
    {
        res.json({"data":req.body, "msg":"Invalid Credentials", "rcode":-9})
    }
    
}

module.exports.getAllusers = function(req, res){
    UserModel.find().then(data=>{
        res.json({data:data, msg:"Get all users", rcode:200})
    })
}