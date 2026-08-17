const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  addToCart,getCart,updateCartQuantity,removeCartItem,
} = require("../controllers/cartController");

router.post(
  "/",
  verifyToken,
  addToCart
);


router.get(
  "/",
  verifyToken,
  getCart
);

router.put(
  "/:id",
  verifyToken,
  updateCartQuantity
);

router.delete(
  "/:id",
  verifyToken,
  removeCartItem
);

module.exports = router;