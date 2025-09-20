const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const app = require("./src/app");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
