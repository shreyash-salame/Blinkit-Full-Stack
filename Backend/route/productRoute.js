const express = require("express");
const auth = require("../middleware/auth.js");
const {
  createProductController,
  deleteProductDetails,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductController,
  getProductDetails,
  searchProduct,
  updateProductDetails,
} = require("../controller/productController.js");
const admin = require("../middleware/Admin.js");

const productRouter = express.Router();

productRouter.post("/create", auth, admin, createProductController);
productRouter.post("/get", getProductController);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post(
  "/get-pruduct-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);
productRouter.post("/get-product-details", getProductDetails);

//update product
productRouter.put("/update-product-details", auth, admin, updateProductDetails);

//delete product
productRouter.delete("/delete-product", auth, admin, deleteProductDetails);

//search product
productRouter.post("/search-product", searchProduct);

module.exports = productRouter;
