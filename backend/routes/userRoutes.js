const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const { getUsers,deleteUser,getAddress,saveAddress } = require("../controllers/userController");

router.get(
  "/",
  verifyToken,
  adminMiddleware,
  getUsers
);

router.delete(
  "/:id",
  verifyToken,
  adminMiddleware,
  deleteUser
);


router.get(
  "/address",
  verifyToken,
  getAddress
);

router.put(
  "/address",
  verifyToken,
  saveAddress
);

module.exports = router;