import AsyncHandler from 'express-async-handler'
import User from '../Models/models.js'
import generateToken from '../Utils/generateToken.js'
// LoginUser
const AuthUser=AsyncHandler(async(req, res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.comparePwd(password))){
        generateToken(res, user._id)
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(401)
        throw new Error(`Invalid Email or Password`)
    }
    res.status(200).json({message:'Auth User'})
})

const RegisterUser=AsyncHandler(async(req, res)=>{
   const {name, email, password} =req.body

   const UserExists = await User.findOne({email})
   if(UserExists){
       res.status(400)
       throw new Error(`User already exists`)
   }else{
       const NewUser  = await User.create({
           name,
           email,
           password
       })
       if(NewUser){
        generateToken(res, NewUser._id)
        res.status(201).json({
            _id:NewUser.id,
            name:NewUser.name,
            email:NewUser.email
        })
    }
   }

  
    res.status(200).json({message:'Register User'})
})

const LogOutUser=AsyncHandler(async(req, res)=>{
   
    res.cookie('jwt', '',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:' User Logged out'})

})


const GetUserProfile =AsyncHandler(async(req, res)=>{

    const user = {
        _id : req.user._id,
        name : req.user.name,
        email : req.user.email
    }
    res.status(200).json(user)
    
})
const UpdateUserProfile =AsyncHandler(async(req, res)=>{
    const user =await User.findById(req.user._id)

    if(user){
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const UpdatedUser = await user.save()

        res.status(200).json({
            _id:UpdatedUser._id,
            name:UpdatedUser.name,
            email:UpdatedUser.email
        })
    }else{
        res.status(401)
        throw new Error(`User Not Found`)
    }
    res.status(200).json({message:'Updating User Profile'})
    
})
export{AuthUser, RegisterUser, LogOutUser, GetUserProfile, UpdateUserProfile}






  



