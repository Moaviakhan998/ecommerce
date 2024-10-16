import slugify from "slugify";
import ProductModel from "../Models/ProductModel.js";
import orderModel from "../Models/orderModel.js";
import fs from'fs';
import Usermodel from "../Models/Usermodel.js";
import braintree from "braintree";
import Categorymodel from "../Models/Categorymodel.js";
import 'dotenv/config'
///Payment GateWaay
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    
  });
  

  /////Controlller Function for create product
export const CreateProductController =  async(req, res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        console.log(process.env.BRAINTREE_PUBLIC_KEY);
        //validation
        switch(true){
            case !name:
                return res.status(240).send({message: "Name is required"})
                case !name:
                    return res.status(240).send({message: "Name is required"})
                case !description:
                    return res.status(240).send({message: "Description is required"})  
                case !price:
                    return res.status(240).send({message: "Price is required"})
                case !category:
                    return res.status(240).send({message: "Category is required"})
                case !quantity:
                    return res.status(240).send({message: "Quantity is required"})
                case !photo && photo.size > 100000:
                    return res.status(230).send({message:"Photo is required and should be less 1mb"})
        }
        const products = new ProductModel({...req.fields,slug:slugify(name)})
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(200).send({
            success: true,
            message:"Product Created Successfully",
            products
        })
    } catch (error) {
        console.log(error),
        res.status(250).send({
            success: false,
            message: "Error In Creating Product",
            error
        })
    }
}
//Get product COntroller
export const GetAllProductController =async(req, res)=>{
    try {
        const product =await ProductModel.find({}).populate('category').select('-photo').limit(12).sort({createdAt:-1});
        res.status(200).send({
            success: true,
            totalcount:product.length,
            message: "Successfully get All Products",
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(250).send({
            success: false,
            message: "Error in getting Product",
            error
        })
    }
}
//Get Single Product Controller
export const GetSingleProductController =async(req, res)=>{
    try {
        const product = await ProductModel.findOne({slug: req.params.slug}).populate('category').select('-photo');
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(250).send({
            success: false,
            message: "Error to get single Product",
            error
        })
    }
}

// Get Phot  Controller
export const GetPhotoFromProductController =async(req, res)=>{
    try {
        const product = await ProductModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(250).send({
            success: false,
            message: "Error in photoController",
            error
        })
    }
}
//Delete Product Controller

export const DeleteProductController = async(req,res)=>{
    try {
        await ProductModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully"
        })
    } catch (error) {
        console.log(error),
        res.status(250).send({
            success: false,
            message: "Error In ProductDeletion"
        })
        

    }
}
///Updatee Product Controller
export const UpdateProductController =async(req, res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(240).send({message: "Name is required"})
                
                case !description:
                    return res.status(240).send({message: "Description is required"})  
                case !price:
                    return res.status(240).send({message: "Price is required"})
                case !category:
                    return res.status(240).send({message: "Category is required"})
                case !quantity:
                    return res.status(240).send({message: "Quantity is required"})
                case !photo && photo.size> 100000:
                    return res.status(230).send({message:"Photo is required and should be less 1mb"})
        }
        const products = await ProductModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug: slugify(name)},{new:true})
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(200).send({
            success: true,
            message:"Product Update Successfully",
            products
        })
    } catch (error) {
        console.log(error),
        res.status(250).send({
            success: false,
            message: "Error In Updating Product",
            error
        })
    }
}
/// Filters
export const ProductFilterController =async(req, res)=>{
    try {
        const {checked, radio} = req.body
        let args ={}
        if (checked.length > 0) args.category = checked;    
        if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]}
        const products =  await ProductModel.find(args);
        res.status(200).send({
            success: true,
            Message: "Products Are Filtered",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(250).send({
            success: false,
            message: "Error While Filtering Products",
            error
        })
    }
}
// Product counterd
export const ProductCountController = async(req, res)=>{
    try {
        const totalcount = await ProductModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            message: `${totalcount} are products available`,
            totalcount,
        })
    } catch (error) {
        console.log(error),
        res.status(250).send({
            success: false,
            message: "Error In Counting",
            error
        })
    }
 }
 /// Product List Controller 
 export const ProductListController = async (req,res)=>{
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await ProductModel.find({}).select('-photo').skip((page -1)* perPage).limit(perPage).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            message: "successed",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(250).send({
            success: false,
            message: "Error in Product List Controller",
            error
        })
    }
 }
 // Search Controllerer
 export const SearchController  =  async(req, res)=>{
    try {
        const {keywords} = req.params
        console.log(keywords)
        const results = await ProductModel.find({
            $or:[
                {name:{$regex :`${keywords}`, $options:'i'}},
                {description:{$regex : `${keywords}`, $options:'i'}}
            ]
        }).select('-photo');
        console.log(results)
        res.json(results)
    } catch (error) {
        console.log(error);
        res.status(250).send({
            success: false,
            message: "Error In Searching API",
            error
        })
    }
 }
 ///Related Product Controller
export const RelatedProductController = async(req, res)=>{
    try {
        const{pid,cid} = req.params;
        
        const products = await ProductModel.find({
            category: cid,
            _id: { $ne: pid},
        }).select("-photo").limit(3).populate("category");
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(250).send({
            success: false,
            message: "Error In Related Product Controller API",
            error
        })
    }
}
//Product controller category

export const ProductCategoryController =async(req,res)=>{
    try {
        const category = await Categorymodel.findOne({slug: req.params.slug});
        const products = await ProductModel.find({category}).populate("category");
        res.status(200).send({
            success: true,
            category,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(250).send({
            success: false,
            message:"Error In Productcategory API",
            error
        })
    }
}
///Braintreee API
export const BraintreeTokenController = async(req, res)=>{
    try {
        
        gateway.clientToken.generate({},function(err, response){
            if (err) {
                res.status(250).send(err);
            } else {
                res.status(200).send(response)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(250).send({
            success: false,
            message:"Error In Token API",
            error
        })
    }
}
//BrainTree Payemnt API
export const BraintreePaymentController = (req, res)=>{
    try {
        const {cart ,nonce} = req.body;
        let total =0;
        cart.map((i)=>{
            total +=i.price;
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement: true
            }
        },
        function(error,result){
            if (result) {
                const order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id
                }).save()
                res.json({ok: true})
            }else{
                res.status(250).send(error)
            }
        }
        )
    } catch (error) {
        console.log(error)
    }
}