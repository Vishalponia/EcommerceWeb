const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadCategory");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    addCategory,getCategories,updateCategory,deleteCategory,getSingleCategory
} = require("../controllers/categoryController");

router.get("/", getCategories);


router.post(
  "/",
  verifyToken,
  adminMiddleware,
  upload.single("image"),
  addCategory,
  
);


router.get("/:id", getSingleCategory);



router.put(
  "/:id",
  verifyToken,
  adminMiddleware,
  upload.single("image"),
  updateCategory
);

router.delete(
  "/:id",
  verifyToken,
  adminMiddleware,
  deleteCategory
);


module.exports = router;