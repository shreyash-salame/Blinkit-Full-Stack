const express = require("express");
const auth = require("../middleware/auth");
const {
  addToCartItemController,
  deleteCartItemQtyController,
  getCartItemController,
  updateCartItemQtyController,
} = require("../controller/cartController");

const cartRouter = express.Router();

cartRouter.post("/create", auth, addToCartItemController);
cartRouter.get("/get", auth, getCartItemController);
cartRouter.put("/update-qty", auth, updateCartItemQtyController);
cartRouter.delete("/delete-cart-item", auth, deleteCartItemQtyController);

module.exports = cartRouter;
