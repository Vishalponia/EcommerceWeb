const express = require("express");


const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");

const verifyToken = require("../middleware/authMiddleware");

const {

  placeOrder,getMyOrders,getAllOrders,updateOrderStatus,

} = require("../controllers/orderController");

router.post(

  "/",

  verifyToken,

  placeOrder

);





router.get(
  "/my-orders",
  verifyToken,
  getMyOrders
);







router.get(
  "/",
  verifyToken,
  adminMiddleware,
  getAllOrders
);

router.put(
  "/:id",
  verifyToken,
  adminMiddleware,
  updateOrderStatus
);

module.exports = router;