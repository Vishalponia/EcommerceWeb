const Category = require("../models/Category");
const User = require("../models/User");
const Product = require("../models/Product");

const getDashboardStats = async (req, res) => {
  try {
    const categoryCount = await Category.countDocuments();
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        categories: categoryCount,
        products: productCount,
        orders: 0,
        users: userCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};



