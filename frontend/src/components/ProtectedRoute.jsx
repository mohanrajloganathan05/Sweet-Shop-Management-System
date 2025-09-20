// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // ✅ or use context if you have it

  if (!token) {
    return <Navigate to="/login" replace />; // redirect if not logged in
  }

  return children; // show page if logged in
}
