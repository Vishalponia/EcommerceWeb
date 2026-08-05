const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadProduct");

const {
  addProduct,getProducts,getSingleProduct,getProductsByCategory,updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post(
  "/",
  verifyToken,
  adminMiddleware,
  upload.array("images", 5),
  addProduct
);

router.get("/", getProducts);

router.get("/category/:categoryId", getProductsByCategory);

router.get("/:id", getSingleProduct);



// Update Product
router.put(
  "/:id",
  verifyToken,
  adminMiddleware,
  upload.array("images", 5),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  verifyToken,
  adminMiddleware,
  deleteProduct
);



module.exports = router;