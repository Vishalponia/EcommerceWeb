const razorpay = require("../config/razorpay");

const crypto = require("crypto");
// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

const createRazorpayOrder = async (req, res) => {
  try {

    const { amount } = req.body;

    // Check amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }


    // Razorpay amount is in paise
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };


    // Create Razorpay order
    const order = await razorpay.orders.create(options);


    res.status(200).json({
      success: true,
      message: "Razorpay order created successfully",
      order,
    });


  } catch (error) {

    console.log("RAZORPAY ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};






// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

const verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Create signature
    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

    // Compare signatures
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Payment verified
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {

    console.log("PAYMENT VERIFY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createRazorpayOrder,
  verifyPayment,
};