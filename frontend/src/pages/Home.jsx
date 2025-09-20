import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/Home.css";

export default function Home() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSweets = async () => {
    try {
      const res = await axios.get("/sweets");
      setSweets(res.data.sweets || res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handlePurchase = async (sweetId) => {
    try {
      const res = await axios.post(`/sweets/purchase/${sweetId}`);
      setSweets((prev) =>
        prev.map((s) =>
          s._id === sweetId ? { ...s, quantity: res.data.sweet.quantity } : s
        )
      );
      alert(`Purchased ${res.data.sweet.name}!`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  if (loading) return <p>Loading sweets...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="home-container">
      <h1>Available Sweets</h1>
      {sweets.length === 0 ? (
        <p>No sweets available</p>
      ) : (
        <div className="sweets-grid">
          {sweets.map((sweet) => (
            <div key={sweet._id} className="sweet-card">
              <span>{sweet.name}</span>
              <div className="sweet-info">
                <span>Qty: {sweet.quantity}</span>
                <span>₹{sweet.price}</span>
              </div>
              <button
                disabled={sweet.quantity === 0}
                onClick={() => handlePurchase(sweet._id)}
              >
                {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
