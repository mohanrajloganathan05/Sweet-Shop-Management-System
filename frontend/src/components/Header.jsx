import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout(); // clear token and user context
    navigate("/login", { replace: true }); // force redirect to login
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Incubyte Sweet Shop</div>
      <div className="nav-links">
        {user && <Link className={isActive("/") ? "active" : ""} to="/">Home</Link>}

        {user && user.role === "admin" && (
          <Link className={isActive("/admin") ? "active" : ""} to="/admin">Admin Panel</Link>
        )}

        {user ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link className={isActive("/login") ? "active" : ""} to="/login">Login</Link>
            <Link className={isActive("/register") ? "active" : ""} to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
