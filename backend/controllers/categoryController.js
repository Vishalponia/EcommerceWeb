const Category = require("../models/Category");
const slugify = require("slugify");
const path = require("path");
const fs = require("fs");

const addCategory = async (req, res) => {

    try {

        const { name, description, status } = req.body;

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Category Image Required",
            });

        }

        const category = await Category.create({

            name,

            slug: slugify(name),

            description,
            createdBy: req.user._id,
            updatedBy: req.user._id,

            status,

            image: req.file.filename,

        });

        res.status(201).json({

            success: true,

            message: "Category Added",

            category,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};








const getCategories = async (req, res) => {
  try {

    const categories = await Category.find()
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      categories,
    });

  } catch (error) {

    console.log("Get Categories Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};






const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Update fields
    category.name = name;
    category.slug = slugify(name);
    category.description = description;
    category.updatedBy = req.user._id;
    category.status = status;

    // If a new image is uploaded
    if (req.file) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads/category-images",
        category.image
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      category.image = req.file.filename;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};








const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const imagePath = path.join(
      __dirname,
      "../uploads/category-images",
      category.image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    addCategory,getCategories,updateCategory,deleteCategory,getSingleCategory
};