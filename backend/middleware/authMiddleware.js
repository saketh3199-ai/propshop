import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

//protect routes

const protect = asyncHandler
(
    async (req,res,next)=>
    {
        let token = req.cookies.jwt

        if (token)
        {
            try
            {
                const decoded = jwt.verify(token,process.env.JWT_SECRET)
                req.user = await User.findById(decoded.userId).select('-password')
                next()
            }
            catch(error)
            {
                res.status(401)
                throw new Error('Not Authorized, token failed')
            }
        }
        else
        {
            res.status(401)
            throw new Error('Not Authorized. No Token')
        }
    }
)




const admin = (req,res,next)=>
{

    //TRANSLATION : if user key in request exists and isAdmin is true, then it's a admin
     if (req.user && req.user.isAdmin)
     {
        next()
     }
     else
     {
        res.status(401)
        throw new Error('Not Authorized As Admin')
     }
}




export {protect,admin}