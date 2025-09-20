import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";

export default function Home() {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [purchaseQty, setPurchaseQty] = useState({});

  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const token = localStorage.getItem("token");

  const fetchSweets = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(data.sweets);
      setFilteredSweets(data.sweets);
    } catch (error) {
      console.error("Fetch sweets error:", error);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Search & filter
  useEffect(() => {
    const filtered = sweets.filter((sweet) => {
      const matchesName = sweet.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesCategory = searchCategory
        ? sweet.category.toLowerCase() === searchCategory.toLowerCase()
        : true;
      const matchesMinPrice = minPrice ? sweet.price >= Number(minPrice) : true;
      const matchesMaxPrice = maxPrice ? sweet.price <= Number(maxPrice) : true;
      return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredSweets(filtered);
  }, [searchName, searchCategory, minPrice, maxPrice, sweets]);

  const handlePurchase = async (sweet) => {
    try {
      const quantity = purchaseQty[sweet._id] || 1;

      if (quantity > sweet.quantity) {
        alert("Cannot purchase more than available stock");
        return;
      }

      for (let i = 0; i < quantity; i++) {
        await axios.post(
          `http://localhost:5000/api/sweets/${sweet._id}/purchase`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      alert(`Purchased ${quantity} ${sweet.name}(s)`);
      fetchSweets();
    } catch (error) {
      console.error("Purchase error:", error);
    }
  };

  return (
    <div className="home-container">
      <h2 className="welcome-msg">Welcome to Sweet Shop!</h2>

      {/* Search & Filter */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
       
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="sweets-grid">
        {filteredSweets.length === 0 ? (
          <p>No sweets match your search.</p>
        ) : (
          filteredSweets.map((sweet) => (
            <div
              className={`sweet-card ${sweet.quantity === 0 ? "out-of-stock" : ""}`}
              key={sweet._id}
            >
              <h3>{sweet.name}</h3>
              <p className="category">{sweet.category}</p>
              <p className="price">₹{sweet.price} per piece</p>
              <p className="available">
                {sweet.quantity > 0 ? `Available: ${sweet.quantity}` : "Out of stock"}
              </p>

              <div className="purchase-section">
                <input
                  type="number"
                  min="1"
                  max={sweet.quantity}
                  value={purchaseQty[sweet._id] || 1}
                  onChange={(e) =>
                    setPurchaseQty({
                      ...purchaseQty,
                      [sweet._id]: Number(e.target.value),
                    })
                  }
                  disabled={sweet.quantity === 0}
                />
                <button
                  onClick={() => handlePurchase(sweet)}
                  disabled={sweet.quantity === 0}
                >
                  {sweet.quantity === 0 ? "Out of stock" : "Purchase"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
