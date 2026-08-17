const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();


// Middlewares

app.use(
  cors({
    origin:["http://localhost:5173",
    "https://ecommerce-web-liard-chi.vercel.app"] ,
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is Running...");
});

module.exports = app;