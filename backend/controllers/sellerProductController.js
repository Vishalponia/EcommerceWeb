const Product = require("../models/Product");
const Category = require("../models/Category");

// ==========================================
// ADD SELLER PRODUCT
// ==========================================
const addSellerProduct = async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      stock,
      category,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      stock === undefined ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const images = req.files
      ? req.files.map((file) => file.filename)
      : [];

    console.log("CREATING PRODUCT");
    console.log("SELLER ID:", req.seller._id);

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      images,
      seller: req.seller._id,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });

  } catch (error) {

    console.log("ADD SELLER PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};








const getSellerProducts = async (req, res) => {
  try {
    // console.log("=================================");
    // console.log("SELLER ID:", req.seller?._id);
    // console.log("SELLER ROLE:", req.seller?.role);
    // console.log("=================================");

    const products = await Product.find({
      seller: req.seller._id,
    })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    console.log("SELLER PRODUCTS COUNT:", products.length);

    products.forEach((product) => {
      console.log(
        product.name,
        "=> seller:",
        product.seller
      );
    });

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {

    console.log("GET SELLER PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};













// ==========================================
// GET SINGLE SELLER PRODUCT
// ==========================================

const getSellerProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.seller._id,
    }).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.log("GET SELLER PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// UPDATE SELLER PRODUCT
// ==========================================

const updateSellerProduct = async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      stock,
      category,
    } = req.body;


    // Find product belonging to logged-in seller
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.seller._id,
    });


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or access denied",
      });
    }


    // Check category
    const existingCategory =
      await Category.findById(category);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }


    // Update fields
    product.name = name;
    product.description = description;
    product.price = Number(price);
    product.stock = Number(stock);
    product.category = category;


    // New images if uploaded
    if (req.files && req.files.length > 0) {

      product.images = req.files.map(
        (file) => file.filename
      );

    }


    await product.save();


    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });


  } catch (error) {

    console.log("UPDATE SELLER PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// ==========================================
// DELETE SELLER PRODUCT
// ==========================================

// ==========================================
// DELETE SELLER PRODUCT
// ==========================================

const deleteSellerProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.seller._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or you are not authorized",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log("DELETE SELLER PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  addSellerProduct,
  getSellerProducts,
   getSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,
};