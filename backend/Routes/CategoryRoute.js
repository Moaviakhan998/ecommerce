import  express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


import { CreateCategorycontroller, DeleteCategoryController, GetCategoryController, SingleGetCategoryController } from "../controllers/CreateCategorycontroller.js";
import { UpdateCategoryController } from "../controllers/UpdateCategoryController.js";
const router = express.Router();
//routes
router.post('/create-category', requireSignIn, isAdmin, CreateCategorycontroller);
//Put method Route
router.put('/update-category/:id', requireSignIn, isAdmin, UpdateCategoryController);
//Get method Route
router.get('/get-category', GetCategoryController )
//Get Single Category Route\
router.get('/single-category/:slug', SingleGetCategoryController)

// Delete Category Route
router.delete('/delete-category/:id', DeleteCategoryController)
export default router;