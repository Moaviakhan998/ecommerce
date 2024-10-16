import slugify from "slugify";
import Categorymodel from "../Models/Categorymodel.js";

export const UpdateCategoryController =async(req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await Categorymodel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new:true});
        res.status(200).send({
            success: true,
            message: "Category Update Successfully",
            category,
        })
    } catch (error) {
        console.log(error),
        res.status(250).send({
            success: false,
            error,
            message: "Error In UpdateCategory"
        })
    }
}