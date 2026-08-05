const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const { getUsers,deleteUser } = require("../controllers/userController");

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


module.exports = router;