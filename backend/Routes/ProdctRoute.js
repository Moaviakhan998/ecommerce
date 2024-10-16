import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  BraintreePaymentController,
  BraintreeTokenController,
  CreateProductController,
  DeleteProductController,
  GetAllProductController,
  GetPhotoFromProductController,
  GetSingleProductController,
  ProductCategoryController,
  ProductCountController,
  ProductFilterController,
  ProductListController,
  RelatedProductController,
  SearchController,
  UpdateProductController,
} from "../controllers/ProductController.js";
import formidable from "express-formidable";
const router = express.Router();

// Produt Post Method

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  CreateProductController
);
//Update Product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  UpdateProductController
);
// Get All Product Route

router.get("/get-product", GetAllProductController);

//Get Single Product
router.get("/get-product/:slug", GetSingleProductController);

// Get Photo From Product
router.get("/product-photo/:pid", GetPhotoFromProductController);
//Delete Product From Prodcut
router.delete("/delete-product/:pid", DeleteProductController);
//filter Product
router.post("/product-filters", ProductFilterController);
// product coutn
router.get("/product-count", ProductCountController);
//Product display per page
router.get("/product-list/:page", ProductListController);
//Search Productt 
router.get('/search/:keywords', SearchController)
///Simillaer Product
router.get('/related-product/:pid/:cid',  RelatedProductController)
//Get PRoducts On CateGory Base
router.get('/product-category/:slug', ProductCategoryController)

///toke
router.get('/braintree/token', BraintreeTokenController)
//Payments
router.post('/braintree/payments', requireSignIn, BraintreePaymentController)

export default router;
