const express = require("express");
const {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require("../controllers/sweetController");

const { protect } = require("../middleware/authMiddleware"); // JWT auth
const { admin } = require("../middleware/adminMiddleware"); // Admin check

const router = express.Router();

// ----------------------
// Public / Protected Routes
// ----------------------

// GET all sweets (protected)
router.get("/", protect, getAllSweets);

// GET search sweets by query (protected)
router.get("/search", protect, searchSweets);

// ----------------------
// Admin-only Routes
// ----------------------
router.post("/", protect, admin, addSweet);           // Add new sweet
router.put("/:id", protect, admin, updateSweet);     // Update sweet
router.delete("/:id", protect, admin, deleteSweet);  // Delete sweet
router.post("/:id/restock", protect, admin, restockSweet); // Restock sweet

// ----------------------
// Purchase Route (Protected for all users)
// ----------------------
router.post("/:id/purchase", protect, purchaseSweet); // Purchase sweet

module.exports = router;
