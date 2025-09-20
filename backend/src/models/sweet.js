const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Sweet name is required"],
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Milk-based", "Flour-based", "Dry sweets", "Regional Special"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Quantity cannot be negative"],
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("Sweet", sweetSchema);
