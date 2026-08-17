const express = require("express");

const router = express.Router();

const {
  createRazorpayOrder,verifyPayment
} = require("../controllers/paymentController");


// CREATE RAZORPAY ORDER

router.post(
  "/create-order",
  createRazorpayOrder
);

router.post(
  "/verify",
  verifyPayment
);


module.exports = router;