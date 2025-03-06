import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "lightgreen",
        height: "100vh",
      }}
    >
      <h2>Admin Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Welcome, Admin!</h3>
        <p>Use the links below to manage student courses:</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Student Management</h4>
        <ul>
          <li>
            <Link to="/students">View All Students</Link>
          </li>
          <li>
            <Link to="/add-student">Add New Student</Link>
          </li>
          <li>
            <Link to="/delete-student">Delete Student</Link>
          </li>
        </ul>
      </div>

      <div>
        <h4>Course Management</h4>
        <ul>
          <li>
            <Link to="/courses">View All Courses</Link>
          </li>
          <li>
            <Link to="/add-course">Add New Course</Link>
          </li>
          <li>
            <Link to="/delete-course">Delete Course</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
