require("dotenv").config();

const app = require("./app");
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const categoryRoutes = require("./routes/categoryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});