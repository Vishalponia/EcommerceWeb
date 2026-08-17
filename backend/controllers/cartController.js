const Cart = require("../models/Cart");
const Product = require("../models/Product");


const addToCart = async (req, res) => {

  try {

    const { productId, quantity } = req.body;

    if (!productId) {

      return res.status(400).json({
        success: false,
        message: "Product is required",
      });

    }

    const product = await Product.findById(productId);

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }

    let cartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (cartItem) {

      cartItem.quantity += quantity || 1;

      await cartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated",
      });

    }

    cartItem = await Cart.create({

      user: req.user._id,

      product: productId,

      quantity: quantity || 1,

    });

    res.status(201).json({

      success: true,

      message: "Product added to cart",

      cartItem,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};







const getCart = async (req, res) => {
  try {

    const cart = await Cart.find({
      user: req.user._id,
    })
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};







const updateCartQuantity = async (req, res) => {

  try {

    const { quantity } = req.body;

    const item = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) {

      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });

    }

    if (quantity < 1) {

      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });

    }

    item.quantity = quantity;

    await item.save();

    res.status(200).json({
      success: true,
      message: "Quantity Updated",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


const removeCartItem = async (req, res) => {

  try {

    const item = await Cart.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) {

      return res.status(404).json({
        success: false,
        message: "Item not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Product Removed",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



module.exports = {
  addToCart,getCart,updateCartQuantity,removeCartItem,
};