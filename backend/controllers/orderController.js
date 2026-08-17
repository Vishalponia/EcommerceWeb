const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");

const {
  sendOrderConfirmationEmail,
  sendOrderDeliveredEmail,
} = require("../utils/sendEmail");








const placeOrder = async (req, res) => {

  try {

    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      paymentMethod,
      paymentStatus,
    } = req.body;


    // ==========================================
    // GET CART
    // ==========================================

    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");


    // ==========================================
    // CHECK CART
    // ==========================================

    if (cartItems.length === 0) {

      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });

    }


    // ==========================================
    // CREATE PRODUCTS
    // ==========================================

    const products = cartItems.map((item) => ({

      product: item.product._id,

      quantity: item.quantity,

      price: item.product.price,

    }));


    // ==========================================
    // TOTAL
    // ==========================================

    const totalAmount = cartItems.reduce(

      (sum, item) =>

        sum +
        item.product.price * item.quantity,

      0

    );


    // ==========================================
    // CREATE ORDER
    // ==========================================

    const order = await Order.create({

  user: req.user._id,

  products,

  shippingAddress: {
    fullName,
    phone,
    address,
    city,
    state,
    pincode,
  },

  paymentMethod,

  paymentStatus:
    paymentStatus ||
    (paymentMethod === "Razorpay"
      ? "Paid"
      : "Pending"),

  totalAmount,

});

    // ==========================================
    // GET USER
    // ==========================================

    const user = await User.findById(
      req.user._id
    );


    // ==========================================
    // SEND ORDER EMAIL
    // ==========================================

    if (user?.email) {

      await sendOrderConfirmationEmail(

        user.name,

        user.email,

        order

      );

    }


    // ==========================================
    // CLEAR CART
    // ==========================================

    await Cart.deleteMany({

      user: req.user._id,

    });


    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(201).json({

      success: true,

      message: "Order Placed Successfully",

      order,

    });


  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};










// order fetch karne ke liye

const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user._id,
    })

      .populate("products.product")

      .sort({
        createdAt: -1,
      });

    res.status(200).json({

      success: true,

      orders,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};




//admin ke liye orders fetch karne ke liye

const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()

      .populate("user", "name email")

      .populate("products.product")

      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};






const updateOrderStatus = async (req, res) => {

  try {

    const { orderStatus } = req.body;


    // ==========================================
    // FIND ORDER
    // ==========================================

    const order = await Order.findById(
      req.params.id
    )
      .populate("user", "name email")
      .populate("products.product");


    // ==========================================
    // CHECK ORDER
    // ==========================================

    if (!order) {

      return res.status(404).json({

        success: false,

        message: "Order not found",

      });

    }


    // ==========================================
    // OLD STATUS
    // ==========================================

    const oldStatus = order.orderStatus;


    // ==========================================
    // UPDATE STATUS
    // ==========================================

    order.orderStatus = orderStatus;

    await order.save();


    // ==========================================
    // DELIVERED EMAIL
    // ==========================================

    if (

      oldStatus !== "Delivered" &&

      orderStatus === "Delivered" &&

      order.user?.email

    ) {

      await sendOrderDeliveredEmail(

        order.user.name,

        order.user.email,

        order

      );

    }


    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({

      success: true,

      message: "Order status updated",

      order,

    });


  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {

  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,

};