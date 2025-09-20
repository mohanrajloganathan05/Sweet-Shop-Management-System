const Sweet = require("../models/sweet");


// 1️ Add new sweet (Admin)

const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    // Check if sweet with same name exists
    const existingSweet = await Sweet.findOne({ name });
    if (existingSweet) {
      return res.status(400).json({ message: "Sweet already exists" });
    }

    const sweet = await Sweet.create({ name, category, price, quantity });
    res.status(201).json({ message: "Sweet added successfully", sweet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2 Get all sweets

const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    res.json({ sweets });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 3️ Search sweets

const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    // Build query object dynamically
    let query = {};
    if (name) query.name = { $regex: name, $options: "i" }; // case-insensitive
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query);
    res.json({ sweets });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 4️ Update sweet (Admin)

const updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, quantity } = req.body;

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    // Update fields
    if (name) sweet.name = name;
    if (category) sweet.category = category;
    if (price !== undefined) sweet.price = price;
    if (quantity !== undefined) sweet.quantity = quantity;

    await sweet.save();
    res.json({ message: "Sweet updated successfully", sweet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 5️ Delete sweet (Admin)

const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    await sweet.remove();
    res.json({ message: "Sweet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 6️ Purchase sweet (User)

const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity <= 0)
      return res.status(400).json({ message: "Out of stock" });

    sweet.quantity -= 1;
    await sweet.save();

    res.json({ message: "Purchase successful", sweet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 7️ Restock sweet (Admin)

const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0)
      return res.status(400).json({ message: "Invalid quantity" });

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity += Number(quantity);
    await sweet.save();

    res.json({ message: "Sweet restocked successfully", sweet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};
