import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

export default function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all sweets
  const fetchSweets = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(data.sweets);
    } catch (error) {
      console.error("Fetch sweets error:", error);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Add sweet
  const handleAddSweet = async () => {
    try {
      const form = { name, category, price, quantity };
      await axios.post("http://localhost:5000/api/sweets", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSweets();
      setName("");
      setCategory("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error("Add sweet error:", error);
    }
  };

  // Update sweet
  const handleUpdateSweet = async (id, updatedFields) => {
    try {
      await axios.put(`http://localhost:5000/api/sweets/${id}`, updatedFields, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSweets();
    } catch (error) {
      console.error("Update sweet error:", error);
    }
  };

  // Delete sweet
  const handleDeleteSweet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sweets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSweets();
    } catch (error) {
      console.error("Delete sweet error:", error);
    }
  };

  // Restock sweet
  const handleRestockSweet = async (id, restockQty) => {
    try {
      await axios.post(
        `http://localhost:5000/api/sweets/${id}/restock`,
        { quantity: restockQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSweets();
    } catch (error) {
      console.error("Restock sweet error:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <div className="add-sweet-form">
        <h3>Add New Sweet</h3>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleAddSweet}>Add Sweet</button>
      </div>

      <div className="sweet-list">
        <h3>All Sweets</h3>
        {sweets.length === 0 ? (
          <p>No sweets available.</p>
        ) : (
          <table className="sweet-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sweets.map((sweet) => (
                <tr key={sweet._id}>
                  <td>{sweet.name}</td>
                  <td>{sweet.category}</td>
                  <td>
                    <input
                      type="number"
                      value={sweet.price}
                      onChange={(e) =>
                        handleUpdateSweet(sweet._id, { price: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={sweet.quantity}
                      onChange={(e) =>
                        handleUpdateSweet(sweet._id, { quantity: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteSweet(sweet._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="action-btn restock"
                      onClick={() => {
                        const qty = prompt("Enter quantity to restock:");
                        if (qty) handleRestockSweet(sweet._id, qty);
                      }}
                    >
                      Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
