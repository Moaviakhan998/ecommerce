import Usermodel from "../Models/Usermodel.js"
import orderModel from "../Models/orderModel.js"
import { comparePassword, hashPassword } from "../helpers/authhelper.js"
import JWT from 'jsonwebtoken'
export const registerController =async(req, res)=>{
   
    try {

        const {name, email,answer,role, password, phone, address}= req.body
        
        //validations

        if (!name) {
            return res.send({message: 'Name is require'})
        }
        if (!email) {
            return res.send({message: 'email is require'})
        }
        if (!answer) {
            return res.send({message: 'Answer is require'})
        }
        if (!password) {
            return res.send({message: 'Password is require'})
        }
        if (!phone) {
            return res.send({message: 'Phone number is require'})
        }
        if (!address) {
            return res.send({message: 'Address is require'})
        }
        //checking User
        const existinguser = await Usermodel.findOne({email})
        
        // Existing User
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: 'Already Register please login'
            })
        }
        // register User
        const hashedpassword = await hashPassword(password)
        //save
        const user =await new Usermodel({name, email,answer, password: hashedpassword,role, phone, address}).save()
        res.status(201).send({
            success: true,
            message: "User Regsiter Successfully",
            user
        })
    } catch (error) {
        
        res.status(500).send({
            success : false,
            message: "Error In regestration",
            error
        })
    }
}

// LOGIN CONTROLLER

export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check user
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials"
            });
        }

        // JWT Token creation
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Send response
        res.status(200).send({
            success: true,
            message: "Login Successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error: error.message
        });
    }
};

//forget password controller
export const ForgetpasswordController = async (req, res)=>{
    
    
    try {
        const {email, answer, newpassword} = req.body;
       
        if (!email) {
            res.status(301).send({
                message: "Email is required",
            })
        }
        if (!answer) {
            res.status(302).send({
                message: "answer is required",
            })
        }
        if (!newpassword) {
            res.status(303).send({
                message: "New Password is required",
            })
        }
        //check validation
        const user =await Usermodel.findOne({email, answer})
        if (!user) {
            res.status(305).send({
                message: "Invalid email or Answer"
            })
        }
        const hashed = await hashPassword(newpassword);
        await Usermodel.findByIdAndUpdate(user._id, {password: hashed});
        res.status(200).send({
            success: true,
            message: "Password reset Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(300).send({
            success: false,
            error
        })
    }
}
//Update Profile  Controller
export const UpdateProfileController =async(req,res)=>{
    try {
        const{name, email,password, address,phone}= req.body;
        const user = await Usermodel.findById(req.user._id)
        //Pasword
        if (password && password.length<6) {
            return res.json({
                error:"Password is required and 6 character long"
            })
        }
        //has password
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await Usermodel.findByIdAndUpdate(req.user._id,{
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address ||user.address
        },{new: true})
        res.status(200).send({
            success: true,
            message:"Prfile udpdated successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(250).send({
            success: false,
            message: "Error In UpdateController API",
            error
        })
    }
}
//GEtIng Order Controller
export  const getOrdersController =async(req,res)=>{
        try {
            const orders = await orderModel.find({buyer: req.user._id}).populate("products","-photo").populate("buyer","name");
            res.json(orders);
        } catch (error) {
            console.log(error)
            res.status(250).send({
                success : false,
                message:"Error While Getting Orders",
                error
            })
        }
}
//Getting All orders Controller
export  const getAllOrderController =async(req,res)=>{
    try {
        const orders = await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort({ createdAt:-1});
        res.json(orders);
    } catch (error) {
        console.log(error)
        res.status(250).send({
            success : false,
            message:"Error While Getting All Orders",
            error
        })
    }
}
export const ordersStatusController =async(req, res)=>{
    try {
        const{orderId} = req.params;
        const {status} = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId,{status},{new: true});
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(250).send({
            success: false,
            message:"Error In updateing status API",
            error
        })
    }
}

// test controller
export const testController = (req, res)=>{
    res.send("Protected Api calls")
}
