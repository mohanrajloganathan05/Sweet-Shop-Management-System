const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const sweetRoutes = require("./routes/sweetRoutes");
const dotenv = require("dotenv"); 

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
  res.send("Sweet Shop Management System API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);


module.exports = app;







