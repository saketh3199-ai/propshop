import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import { generateJwtToken } from "../utils/generateJwtToken.js"
//Auth controller
const loginUser = asyncHandler
(
    async (req,res)=>
    {   
        const {email,password} = req.body 
        const user = await User.findOne({email:email})
        
        if (user && (await user.matchPassword(password)))
        {
           
            generateJwtToken(res,user._id)
            res.json({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin})
        }

        else
        {
            res.status(401)
            throw new Error('Invalid email or password')
        }

        
    }
)

//Register Controller
const registerUser = asyncHandler
(
    async (req,res)=>
    {
        const {name,email,password} = req.body

        const userExists = await User.findOne({email})

        if (userExists)
        {
            res.status(400)
            throw new Error('User Exists Already')
        }

        const user = await User.create({name,email,password})

        if (user)
        {
            generateJwtToken(res,user._id)
            res.status(201)
            res.json({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin})
        }
        else
        {
            res.status(400)
            throw new Error('invalid user data')
        }
    }
)



//logout controller

const logoutUser= asyncHandler
(
    (req,res)=>
    {
        res.cookie('jwt','',{httpOnly:true,expires:new Date(0)})
        res.status(200)
        res.json({message:'Logged Out Successfully'})
    }
)



//Get User Profile Controller

const getUserProfile= asyncHandler
(
   async  (req,res)=>
    {
        const user = await User.findById(req.user._id)

        if(user)
        {
            res.status(200)
            
            res.json({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin})
        }
        else
        {
            res.status(404)
            throw new Error('User Not Found')
        }
    }
)



//Update User Profile Controller


const updateUserProfile = asyncHandler
(
    async (req,res)=>
    {
        const user= await User.findById(req.user._id)

        if (user)
        {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email

            if (req.body.password)
            {
                user.password = req.body.password
            }
            
            const updatedUser = await user.save()
            res.status(200)
            res.json({_id:updatedUser._id,name:updatedUser.name,email:updatedUser.email,isAdmin:updatedUser.isAdmin})
        }
        else
        {
            res.status(404)
            throw new Error('User Not Found')
        }
    }
)

//get all users controller

const getUsers = asyncHandler
(
    async (req,res)=>
    {
        const users = await User.find({})
        res.status(200)
        res.json(users)
    }
)




//get users by id controller

const getUserById = asyncHandler
(
    async (req,res)=>
    {
        const user = await User.findById(req.params.id).select('-password')
        if (user)
        {
            res.status(200)
            res.json(user)
        }
        else
        {
            res.status(404)
            throw new Error('User Not Found')
        }
    }
)


//update user by id 
const updateUser = asyncHandler
(
    async (req,res)=>
    {
        const user = await User.findById(req.params.id)

        if (user)
        {
             user.name = req.body.name || user.name
             user.email = req.body.email || user.email
             user.isAdmin = Boolean(req.body.isAdmin)
            
             const updatedUser = await user.save()

             res.status(200)
             res.json({_id:updateUser._id,name:updateUser.name,email:updatedUser.email,isAdmin:updatedUser.isAdmin})
        }
        else
        {
            res.status(404)
            throw new Error('User Not Found')
        }
    }
)


//Delete User Profile Controller


const deleteUser = asyncHandler
(
    async (req,res)=>
    {
        const user = await User.findById(req.params.id)

        if (user)
        {
            //admin users are not-deleteable
            if (user.isAdmin)
            {
                 res.status(400)
                 throw new Error('Cannot delete Admin User')
            }
            await User.deleteOne({_id:user._id})
            res.status(200)
            res.json({message:'User has been deleted!!!'})
        }
        else
        {
            res.status(404)
            throw new Error('User Not Found')
        }
    }
)



export {loginUser,registerUser,logoutUser,getUserProfile,updateUserProfile,getUsers,deleteUser,getUserById,updateUser}