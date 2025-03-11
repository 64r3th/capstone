import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import StudentForm from "./components/StudentForm";
import CourseList from "./components/CourseList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import "./App.css";
import "./components/Navbar.css";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await fetch("http://localhost:3001/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setUser={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/students"
            element={
              user?.role === "student" ? (
                <StudentForm />
              ) : (
                <Navigate to="/StudentForm" />
              )
            }
          />
          <Route path="/courses" element={<CourseList />} />
          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminPanel />
              ) : (
                <Navigate to="/AdminPanel" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
