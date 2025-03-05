import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ role }) => {
  return (
    <nav className="navbar" style={styles.navbar}>
      <h2 className="logo" style={styles.logo}>
        Student Registration
      </h2>
      <ul className="nav-links" style={styles.navLinks}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {role === "student" && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/manage">Mange Details</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
          </>
        )}
        {role === "admin" && (
          <>
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/students">Students</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
