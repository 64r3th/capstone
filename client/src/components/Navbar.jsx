import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">Student Registration</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to={user.role === "admin" ? "/admin" : "/dashboard"}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li className="user-info">Welcome, {user.username}!</li>
            <li>
              <button onClick={onLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
