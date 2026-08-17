const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");
const Product = require("../models/Product");

// ==========================================
// SELLER SIGNUP
// ==========================================

const sellerSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      shopName,
    } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Check existing seller
    const existingSeller = await Seller.findOne({
      email,
    });

    if (existingSeller) {
      return res.status(409).json({
        success: false,
        message: "Seller email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create seller
    const seller = await Seller.create({
      name,
      email,
      password: hashedPassword,
      phone,
      shopName,
    });

    res.status(201).json({
      success: true,
      message: "Seller registered successfully",
      seller: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        shopName: seller.shopName,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// SELLER LOGIN
// ==========================================

const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find seller
    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check active status
    if (!seller.isActive) {
      return res.status(403).json({
        success: false,
        message: "Seller account is inactive",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      seller.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create token
    const token = jwt.sign(
  {
    id: seller._id,
    role: "seller",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

    // Create cookie
    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Seller login successful",

      seller: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        shopName: seller.shopName,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// SELLER PROFILE
// ==========================================


const getSellerProfile = async (req, res) => {
  try {

    const seller = await Seller.findById(
      req.seller._id
    ).select("-password");

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    res.status(200).json({
      success: true,
      seller,
    });

  } catch (error) {

    console.log("SELLER PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getSellerProducts = async (req, res) => {
  try {

    const products = await Product.find({
      seller: req.seller.id,
    })
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};







const sellerLogout = async (req, res) => {
  try {

    res.clearCookie("sellerToken");

    res.status(200).json({
      success: true,
      message: "Seller logged out successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  sellerSignup,
  sellerLogin,
  getSellerProfile,
  getSellerProducts,
  sellerLogout,
};