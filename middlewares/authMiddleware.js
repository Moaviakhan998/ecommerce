import JWT from 'jsonwebtoken'
import Usermodel from '../Models/Usermodel.js'
//protected routes token base

export const  requireSignIn = async (req, res, next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user= decode;
        next()
    } catch (error) {
        console.log(error)
    }
}

// admin access
export const isAdmin = async (req, res, next)=>{
    try {
        const user = await Usermodel.findById(req.user._id)
        if (user.role !==1) {
            return res.status(403).send({
                success: false,
                message: "UnAuthorized Access"
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(402).send({
            success: false,
            error,
            message: "Error is admin middleware"
        })
    }
} 