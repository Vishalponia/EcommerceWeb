const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  verifyToken,
  adminMiddleware,
  getDashboardStats
);

module.exports = router;