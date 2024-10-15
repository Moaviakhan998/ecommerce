import Categorymodel from "../Models/Categorymodel.js";
import slugify from "slugify";
export const CreateCategorycontroller = async(req, res)=>{
    try {
        const {name} = req.body;
        if (!name) {
            return res.status(206).send({
                message:"Name is require"
            })
        }
        const existingCategory = await Categorymodel.findOne({name});
      
        if (existingCategory) {
            return res.status(208).send({
                success: true,
                message: "Category Already Exists"
            })
        }
        const category = await new Categorymodel({name, slug:slugify(name)}).save();
         res.status(201).send({
            success: true,
            message: "Cateogry Created",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(230).send({
            success: false,
            error,
            message: "Error in Catoger"
        })
    }
}

/// Get  Category Controller all

export  const GetCategoryController = async (req, res)=>{
    try {
        const category = await Categorymodel.find({});
        res.status(200).send({
            success: true,
            message: "All Category here",
            category
        })
        console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
    } catch (error) {
        console.log(error)
        res.status(250).send({
            success: false,
            error,
            message: "Error in the getController"
        })
    }
}
//Single Category Controller
export const SingleGetCategoryController =async(req, res)=>{
    try {
        const category = await Categorymodel.find({slug: req.params.slug});
        res.status(200).send({
            success: true,
            message:"Get Single Category Successfuly",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(250).send({
            success: false,
            message: "Error in the "
        })
    }
}
// Delete Category Controller
export const DeleteCategoryController =async (req, res)=>{
    try {
        const {id} = req.params;
        await Categorymodel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category Delete Successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(250).send({
            success: false,
            message: "Error in Deleting category",
            error
        })
    }
}