const express = require("express");

const router = express.Router();
const sellerMiddleware = require(
  "../middleware/sellerMiddleware"
);

const {
  sellerSignup,
  sellerLogin,
  getSellerProfile,
  //getSellerProducts,
  sellerLogout,
} = require("../controllers/sellerController");




// Seller Signup
router.post(
  "/signup",
  sellerSignup
);


// Seller Login
router.post(
  "/login",
  sellerLogin
);


// Seller Profile
router.get(
  "/profile",
  sellerMiddleware,
  getSellerProfile
);


// ==========================================
// SELLER PRODUCTS
// ==========================================

// router.get(
//   "/products",
//   sellerMiddleware,
//   getSellerProducts
// );


// ==========================================
// SELLER LOGOUT
// ==========================================

router.post(
  "/logout",
  sellerMiddleware,
  sellerLogout
);

module.exports = router;