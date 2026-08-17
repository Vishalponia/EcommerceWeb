const Product = require("../models/Product");
const Category = require("../models/Category");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      status,
    } = req.body;

    // Validation
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check Category
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Images
    const images = [];

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        images.push(file.filename);
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      status,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {
  console.log("========== ERROR ==========");
  console.log(error);
  

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};


const getProducts = async (req, res) => {
  try {

    const { search } = req.query;

    let products;

    // ==========================================
    // NO SEARCH → GET ALL PRODUCTS
    // ==========================================

    if (!search || search.trim() === "") {

      products = await Product.find({
        status: "Active",
      })
        .populate("category", "name")
        .sort({ createdAt: -1 });

    }

    // ==========================================
    // SEARCH PRODUCTS
    // ==========================================

    else {

      const searchText = search.trim();

      // First find matching categories
      const categories = await Category.find({
        name: {
          $regex: searchText,
          $options: "i",
        },
      }).select("_id");

      const categoryIds = categories.map(
        (category) => category._id
      );

      // Search products
      products = await Product.find({

        status: "Active",

        $or: [

          // Product Name
          {
            name: {
              $regex: searchText,
              $options: "i",
            },
          },

          // Product Description
          {
            description: {
              $regex: searchText,
              $options: "i",
            },
          },

          // Category
          {
            category: {
              $in: categoryIds,
            },
          },

        ],

      })
        .populate("category", "name")
        .sort({ createdAt: -1 });

    }

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {

    console.log("SEARCH PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getProductsByCategory = async (req, res) => {

  try {

    const products = await Product.find({
      category: req.params.categoryId,
      status: "Active",
    }).populate("category", "name");

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};






const updateProduct = async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      stock,
      category,
      status,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check Category
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Keep old images if no new image uploaded
    let images = product.images;

    if (req.files && req.files.length > 0) {

      // Delete old images
      product.images.forEach((img) => {

        const imagePath = path.join(
          __dirname,
          "../uploads/product-images",
          img
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }

      });

      images = req.files.map(file => file.filename);

    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;
    product.status = status;
    product.images = images;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};









const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }

    // Delete Images

    product.images.forEach((img) => {

      const imagePath = path.join(
        __dirname,
        "../uploads/product-images",
        img
      );

      if (fs.existsSync(imagePath)) {

        fs.unlinkSync(imagePath);

      }

    });

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};





const getSingleProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)
      .populate("category");

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

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



module.exports = {
  addProduct,getProducts,getSingleProduct,getProductsByCategory,updateProduct,deleteProduct,
};