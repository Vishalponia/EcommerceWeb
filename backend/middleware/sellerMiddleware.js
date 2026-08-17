

const jwt = require("jsonwebtoken");

const sellerMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.sellerToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Seller not logged in",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Seller access required",
      });
    }

    req.seller = {
      _id: decoded.id,
      role: decoded.role,
    };

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired seller token",
    });

  }
};

module.exports = sellerMiddleware;