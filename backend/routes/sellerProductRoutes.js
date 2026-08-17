const express = require("express");

const router = express.Router();

const sellerMiddleware =
  require("../middleware/sellerMiddleware");

const upload =
  require("../middleware/uploadProduct");

const {
  addSellerProduct,
  getSellerProducts,
  getSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,
} = require("../controllers/sellerProductController");


// ==========================================
// SELLER ADD PRODUCT
// ==========================================

router.post(
  "/",
  sellerMiddleware,
  upload.array("images", 5),
  addSellerProduct
);

router.get(
    "/",
    sellerMiddleware,
    getSellerProducts
)





// ADD PRODUCT

router.post(
  "/",
  sellerMiddleware,
  upload.array("images", 5),
  addSellerProduct
);


// GET SELLER PRODUCTS

router.get(
  "/",
  sellerMiddleware,
  getSellerProducts
);


// GET SINGLE SELLER PRODUCT

router.get(
  "/:id",
  sellerMiddleware,
  getSellerProduct
);


// UPDATE SELLER PRODUCT

router.put(
  "/:id",
  sellerMiddleware,
  upload.array("images", 5),
  updateSellerProduct
);



// DELETE SELLER PRODUCT

router.delete(
  "/:id",
  sellerMiddleware,
  deleteSellerProduct
);
module.exports = router;