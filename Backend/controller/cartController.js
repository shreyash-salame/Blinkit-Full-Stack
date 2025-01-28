const CartProductModel = require("../models/cartProductModel.js");
const UserModel = require("../models/userModel.js");

// Add an item to the cart
const addToCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const { productId } = request.body;

    // Validate input
    if (!productId) {
      return response.status(400).json({
        message: "Provide productId",
        error: true,
        success: false,
      });
    }

    // Check if the item is already in the cart
    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return response.status(400).json({
        message: "Item already in cart",
        error: true,
        success: false,
      });
    }

    // Create a new cart item
    const cartItem = new CartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });
    const savedCartItem = await cartItem.save();

    // Update the user's shopping cart
    await UserModel.updateOne(
      { _id: userId },
      { $push: { shopping_cart: productId } }
    );

    return response.status(200).json({
      data: savedCartItem,
      message: "Item added successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in addToCartItemController:", error);
    return response.status(500).json({
      message: error.message || "An internal server error occurred.",
      error: true,
      success: false,
    });
  }
};

// Get all items in the cart
const getCartItemController = async (request, response) => {
  try {
    const userId = request.userId;

    // Validate userId
    if (!userId) {
      return response.status(400).json({
        message: "User ID is required.",
        error: true,
        success: false,
      });
    }

    // Fetch cart items with populated product details
    const cartItems = await CartProductModel.find({ userId }).populate("productId");

    return response.status(200).json({
      data: cartItems,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in getCartItemController:", error);
    return response.status(500).json({
      message: error.message || "An internal server error occurred.",
      error: true,
      success: false,
    });
  }
};

// Update the quantity of a cart item
const updateCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id, qty } = request.body;

    // Validate input
    if (!_id || qty == null) {
      return response.status(400).json({
        message: "Provide _id and qty",
        error: true,
        success: false,
      });
    }

    // Update the cart item quantity
    const updatedCartItem = await CartProductModel.updateOne(
      { _id: _id, userId: userId },
      { quantity: qty }
    );

    return response.status(200).json({
      message: "Cart updated successfully",
      success: true,
      error: false,
      data: updatedCartItem,
    });
  } catch (error) {
    console.error("Error in updateCartItemQtyController:", error);
    return response.status(500).json({
      message: error.message || "An internal server error occurred.",
      error: true,
      success: false,
    });
  }
};

// Delete a cart item
const deleteCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id } = request.body;

    // Validate input
    if (!_id) {
      return response.status(400).json({
        message: "Provide _id",
        error: true,
        success: false,
      });
    }

    // Delete the cart item
    const deletedCartItem = await CartProductModel.deleteOne({ _id: _id, userId: userId });

    return response.status(200).json({
      message: "Item removed successfully",
      error: false,
      success: true,
      data: deletedCartItem,
    });
  } catch (error) {
    console.error("Error in deleteCartItemQtyController:", error);
    return response.status(500).json({
      message: error.message || "An internal server error occurred.",
      error: true,
      success: false,
    });
  }
};

// Export the controllers
module.exports = {
  addToCartItemController,
  getCartItemController,
  updateCartItemQtyController,
  deleteCartItemQtyController,
};